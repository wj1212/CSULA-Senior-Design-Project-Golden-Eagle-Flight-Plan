/**
 * Me routes:
 *  - GET /api/me          returns current user profile
 *  - GET /api/me/student  returns current user student profile if it exists
 */

import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";
import User from "../models/User";
import Student from "../models/Student";

const router = Router();

// Current user info
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.sub;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Current user student profile
router.get("/student", requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.sub;

    const student = await Student.findOne({ user: userId });
    if (!student) return res.status(404).json({ error: "Student profile not found" });

    return res.json({ student });
  } catch {
    return res.status(500).json({ error: "Failed to fetch student profile" });
  }
});

export default router;



