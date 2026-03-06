import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Helper function: Prepare user response based on privacy settings
const prepareUserResponse = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const response = {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    userType: userObj.userType,
  };

  // If faculty, include approval status so client can display if needed
  if (userObj.userType === "Faculty") {
    response.status = userObj.status;
  }

  // Only include profile fields for Students
  if (userObj.userType === "Student") {
    response.gradeLevel = userObj.gradeLevel;
    response.major = userObj.major;
    response.degreeType = userObj.degreeType;
    response.gpa = userObj.gpa;
    response.credits = userObj.credits;
    response.careerInterests = userObj.careerInterests;
    response.financialStatus = userObj.financialStatus;
    response.commuteStatus = userObj.commuteStatus;
    response.cin = userObj.cin;
    response.linkedIn = userObj.linkedIn;
    // Do NOT include OSD here - privacy controlled via separate endpoint
  }

  return response;
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType, ...profileData } = req.body;

    // Validate userType
    const validTypes = ["Student", "Faculty", "Admin", "Student Organization"];
    if (userType && !validTypes.includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const registrationType = userType || "Student";
    const userData = {
      name,
      email,
      password: hashed,
      userType: registrationType,
      // faculty accounts start pending until an admin approves them
      status: registrationType === "Faculty" ? "pending" : undefined,
    };

    // Only set student profile fields for Student accounts
    if (registrationType === "Student") {
      const studentFields = ["gradeLevel", "major", "degreeType", "gpa", "financialStatus", "commuteStatus", "credits", "careerInterests", "osd", "cin", "linkedIn"];
      studentFields.forEach((field) => {
        if (field in profileData) {
          userData[field] = profileData[field];
        }
      });
      // Note: osdPrivate is NOT set during registration, only in profile updates
    }

    const newUser = new User(userData);

    // Explicitly ensure non-students don't have student-only fields
    if (newUser.userType !== "Student") {
      newUser.careerInterests = undefined;
      newUser.osd = undefined;
      newUser.osdPrivacy = undefined;
      newUser.gradeLevel = undefined;
      newUser.major = undefined;
      newUser.degreeType = undefined;
      newUser.gpa = undefined;
      newUser.financialStatus = undefined;
      newUser.commuteStatus = undefined;
      newUser.credits = undefined;
      newUser.cin = undefined;
      newUser.linkedIn = undefined;
    }

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered",
      token,
      user: prepareUserResponse(newUser),
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // faculty approval flow: block pending/denied accounts
    if (user.userType === "Faculty") {
      if (user.status === "pending") {
        return res.status(403).json({ message: "Account pending admin approval" });
      }
      if (user.status === "denied") {
        return res.status(403).json({ message: "Account denied - contact administrator" });
      }
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: prepareUserResponse(user),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PROFILE (GET) - with OSD privacy controls
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch full user profile including OSD (select: false by default)
    const user = await User.findById(req.user._id).select("+osd");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = prepareUserResponse(user);

    // Handle OSD visibility based on privacy settings
    if (user.userType === "Student") {
      // Student can always see their own OSD data and privacy setting
      if (req.user._id.toString() === user._id.toString()) {
        response.osd = user.osd;
        response.osdPrivacy = user.osdPrivacy;
      }
      // Faculty can see OSD only if osdPrivacy is "public"
      else if (user.osdPrivacy === "public" && req.user.userType === "Faculty") {
        response.osd = user.osd;
        response.osdPrivacy = user.osdPrivacy;
      }
      // else: osd remains hidden
    }

    res.json({ user: response });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE PROFILE (PUT) - with validation for student-only fields
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    // Get current user to check userType
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent non-Students from updating student-only fields
    if (currentUser.userType !== "Student") {
      const studentOnlyFields = [
        "gradeLevel",
        "major",
        "degreeType",
        "gpa",
        "credits",
        "careerInterests",
        "financialStatus",
        "commuteStatus",
        "osd",
        "osdPrivacy",
        "cin",
        "linkedIn",
      ];
      const hasStudentField = studentOnlyFields.some((field) => field in updates);
      if (hasStudentField) {
        return res.status(403).json({ error: "Only Students can update profile data" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true, select: "+osd -password" }
    );

    res.json({ message: "Profile updated successfully", user: prepareUserResponse(updatedUser) });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// VERIFY TOKEN
router.get("/verify", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+osd");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // in case status changed after login (e.g. denied), block access
    if (user.userType === "Faculty" && user.status !== "approved") {
      return res.status(403).json({ error: "Faculty account not approved" });
    }
    res.json({ success: true, user: prepareUserResponse(user) });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- ADMIN ROUTES ----------------

// list all faculty accounts awaiting approval
router.get("/admin/pending-faculty", authenticateToken, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  try {
    const pending = await User.find({ userType: "Faculty", status: "pending" }).select(
      "-password -osd"
    );
    res.json({ pending });
  } catch (err) {
    console.error("Error fetching pending faculty:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// approve faculty account
router.put("/admin/faculty/:id/approve", authenticateToken, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty || faculty.userType !== "Faculty") {
      return res.status(404).json({ message: "User not found" });
    }
    faculty.status = "approved";
    await faculty.save();
    res.json({ message: "Faculty approved" });
  } catch (err) {
    console.error("Error approving faculty:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// deny faculty account
router.put("/admin/faculty/:id/deny", authenticateToken, async (req, res) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Not authorized" });
  }
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty || faculty.userType !== "Faculty") {
      return res.status(404).json({ message: "User not found" });
    }
    faculty.status = "denied";
    await faculty.save();
    res.json({ message: "Faculty denied" });
  } catch (err) {
    console.error("Error denying faculty:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// SEARCH STUDENTS (Faculty only)
router.get("/search-students", authenticateToken, async (req, res) => {
  try {
    // Only faculty can search students
    if (req.user.userType !== "Faculty") {
      console.log("Search denied: user is not faculty", req.user.userType);
      return res.status(403).json({ message: "Access denied" });
    }

    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }

    console.log("Searching students for query:", q);

    // Search by name or CIN (case-insensitive)
    const students = await User.find({
      userType: "Student",
      $or: [
        { name: { $regex: q.trim(), $options: "i" } },
        { cin: { $regex: q.trim(), $options: "i" } }
      ]
    }).select("_id name cin email gradeLevel major degreeType gpa credits careerInterests financialStatus commuteStatus linkedIn");

    console.log("Found students:", students.length);
    
    // Map to include both _id and id
    const mappedStudents = students.map(student => ({
      _id: student._id,
      id: student._id.toString(),
      name: student.name,
      cin: student.cin,
      email: student.email,
      gradeLevel: student.gradeLevel,
      major: student.major,
      degreeType: student.degreeType,
      gpa: student.gpa,
      credits: student.credits,
      careerInterests: student.careerInterests,
      financialStatus: student.financialStatus,
      commuteStatus: student.commuteStatus,
      linkedIn: student.linkedIn
    }));

    res.json({ students: mappedStudents });
  } catch (err) {
    console.error("Error searching students:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET STUDENT DETAILS (Faculty only)
router.get("/student/:id", authenticateToken, async (req, res) => {
  try {
    // Only faculty can view student details
    if (req.user.userType !== "Faculty") {
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("Fetching student details for ID:", req.params.id);

    const student = await User.findById(req.params.id).select("+osd");
    if (!student || student.userType !== "Student") {
      console.log("Student not found or not a student");
      return res.status(404).json({ message: "Student not found" });
    }

    // Prepare response with all student data
    const response = prepareUserResponse(student);
    
    // Add _id and id explicitly
    response._id = student._id;
    response.id = student._id.toString();
    
    // Include OSD if privacy allows
    if (student.osdPrivacy === "public") {
      response.osd = student.osd;
    }

    console.log("Returning student details");
    res.json({ student: response });
  } catch (err) {
    console.error("Error getting student details:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
