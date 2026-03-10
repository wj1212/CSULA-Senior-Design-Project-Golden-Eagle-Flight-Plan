import express from "express";
import ProfileConfig from "../models/ProfileConfig.js";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// GET: Retrieve the current profile configuration
// Public endpoint - allows students and faculty to fetch available options
router.get("/", async (req, res) => {
  try {
    let config = await ProfileConfig.findOne();

    // If no config exists, create one with defaults
    if (!config) {
      config = new ProfileConfig();
      await config.save();
    }

    res.json({ success: true, config });
  } catch (error) {
    console.error("Error fetching profile config:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST: Update the profile configuration (Faculty only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Check if user is Faculty or Admin
    const user = await User.findById(req.user.id);
    if (!user || (user.userType !== "Faculty" && user.userType !== "Admin")) {
      return res.status(403).json({ success: false, error: "Unauthorized. Only Faculty or Admin can modify profile configuration." });
    }

    // Ensure Faculty is approved
    if (user.userType === "Faculty" && user.status !== "approved") {
      return res.status(403).json({ success: false, error: "Your faculty account must be approved before making changes." });
    }

    const { majors, financialStatuses, gradeLevels, commuteStatuses, osdOptions, careerInterests } = req.body;

    let config = await ProfileConfig.findOne();
    if (!config) {
      config = new ProfileConfig();
    }

    // Update only provided fields
    if (majors) config.majors = majors;
    if (financialStatuses) config.financialStatuses = financialStatuses;
    if (gradeLevels) config.gradeLevels = gradeLevels;
    if (commuteStatuses) config.commuteStatuses = commuteStatuses;
    if (osdOptions) config.osdOptions = osdOptions;
    if (careerInterests) config.careerInterests = careerInterests;

    await config.save();

    res.json({ success: true, message: "Profile configuration updated", config });
  } catch (error) {
    console.error("Error updating profile config:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
