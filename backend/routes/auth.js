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
    };

    // Only set student profile fields for Student accounts
    if (registrationType === "Student") {
      const studentFields = ["gradeLevel", "major", "degreeType", "gpa", "financialStatus", "commuteStatus", "credits", "careerInterests", "osd"];
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
      newUser.osdPrivate = undefined;
      newUser.gradeLevel = undefined;
      newUser.major = undefined;
      newUser.degreeType = undefined;
      newUser.gpa = undefined;
      newUser.financialStatus = undefined;
      newUser.commuteStatus = undefined;
      newUser.credits = undefined;
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
    res.json({ success: true, user: prepareUserResponse(user) });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
