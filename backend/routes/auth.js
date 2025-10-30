import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashed,
      userType: userType || "Student"
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        gradeLevel: user.gradeLevel,
        major: user.major,
        degreeType: user.degreeType,
        completedCourses: user.completedCourses,
        currentCourses: user.currentCourses,
        careerInterests: user.careerInterests,
        disabilities: user.disabilities,
        availability: user.availability,
        recommendedCourses: user.recommendedCourses,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PROFILE (GET)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: req.user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE PROFILE (PUT)
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// VERIFY TOKEN
router.get("/verify", authenticateToken, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
