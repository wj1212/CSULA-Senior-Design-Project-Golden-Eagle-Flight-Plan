import express from "express";
import Course from "../models/Course.js";
import { getRecommendedCourses, getCourseProgress } from "../services/courseRecommender.js";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /api/courses
 * Get all CS courses
 */
router.get("/", async (req, res) => {
  try {
    const { category, semester } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (semester) {
      query.semester = parseInt(semester);
    }
    
    const courses = await Course.find(query).sort({ semester: 1, courseCode: 1 });
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses"
    });
  }
});

/**
 * GET /api/courses/recommended
 * Get personalized course recommendations for authenticated user
 */
router.get("/recommended", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's completed courses
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    const completedCourses = user.completedCourses || [];
    
    // Get recommendations
    const recommendations = await getRecommendedCourses(completedCourses);
    
    // Get progress statistics
    const progress = await getCourseProgress(completedCourses);
    
    res.json({
      success: true,
      data: {
        recommendations,
        progress
      }
    });
  } catch (error) {
    console.error("Error getting recommendations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get recommendations"
    });
  }
});

/**
 * GET /api/courses/progress
 * Get course progress statistics for authenticated user
 */
router.get("/progress", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's completed courses
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    const completedCourses = user.completedCourses || [];
    const progress = await getCourseProgress(completedCourses);
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error("Error getting progress:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get progress"
    });
  }
});

/**
 * GET /api/courses/:courseCode
 * Get specific course details
 */
router.get("/:courseCode", async (req, res) => {
  try {
    const { courseCode } = req.params;
    
    const course = await Course.findOne({ courseCode });
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found"
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch course"
    });
  }
});

/**
 * GET /api/courses/search/:query
 * Search courses by name or code
 */
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    
    const courses = await Course.find({
      $or: [
        { courseCode: { $regex: query, $options: 'i' } },
        { courseName: { $regex: query, $options: 'i' } }
      ]
    }).limit(20);
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({
      success: false,
      error: "Failed to search courses"
    });
  }
});

export default router;
