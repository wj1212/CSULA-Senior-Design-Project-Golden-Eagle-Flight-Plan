import express from "express";
import ScoreboardTask from "../models/ScoreboardTask.js";
import TaskCompletion from "../models/TaskCompletion.js";
import { authenticateToken } from "../middleware/auth.js";
import {
  computeLevel,
  computeBadges,
  STANDING_CAPS,
} from "../utils/levelCalculator.js";

const router = express.Router();

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Aggregate a student's total points and per-category breakdown from
 * their TaskCompletion documents. Expects completions to have `.task` populated
 * with at least the `category` field.
 */
function aggregatePoints(completions) {
  let totalPoints = 0;
  const pointsByCategory = {
    ACADEMIC_PROGRESS: 0,
    CAREER_PREP: 0,
    PROFESSIONAL_SKILLS: 0,
    COMMUNITY_LEADERSHIP: 0,
  };

  for (const comp of completions) {
    totalPoints += comp.pointsAwarded;
    if (comp.task) {
      pointsByCategory[comp.task.category] =
        (pointsByCategory[comp.task.category] || 0) + comp.pointsAwarded;
    }
  }

  return { totalPoints, pointsByCategory };
}

// ─── GET /api/scoreboard/tasks ────────────────────────────────────────────────
// Returns the task catalog. Optional query params: yearTarget, category.
router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const { yearTarget, category } = req.query;
    const filter = { isActive: true };
    if (yearTarget) filter.yearTarget = Number(yearTarget);
    if (category) filter.category = category;

    const tasks = await ScoreboardTask.find(filter).sort({
      yearTarget: 1,
      category: 1,
      sortOrder: 1,
    });

    res.json({ tasks });
  } catch (err) {
    console.error("GET /scoreboard/tasks error:", err);
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// ─── GET /api/scoreboard/me ───────────────────────────────────────────────────
// Returns the full scoreboard progress for the authenticated student.
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const studentId = req.user._id;
    const gradeLevel = req.user.gradeLevel || "Freshman";

    // 1. All active tasks
    const allActiveTasks = await ScoreboardTask.find({ isActive: true }).sort({
      yearTarget: 1,
      category: 1,
      sortOrder: 1,
    });

    // 2. All completions for this student (with task details populated)
    const completions = await TaskCompletion.find({ student: studentId })
      .populate("task", "title category points yearTarget maxCompletions")
      .sort({ createdAt: -1 });

    // 3. Build per-task completion summary map: taskId → { count, latestCompletion }
    const completionsByTask = {};
    for (const comp of completions) {
      if (!comp.task) continue; // guard against orphaned records
      const taskId = comp.task._id.toString();
      if (!completionsByTask[taskId]) {
        completionsByTask[taskId] = { count: 0, latest: null };
      }
      completionsByTask[taskId].count += 1;
      // Since we sorted desc by createdAt, the first one encountered is the latest
      if (!completionsByTask[taskId].latest) {
        completionsByTask[taskId].latest = comp;
      }
    }

    // Set of task IDs the student has completed at least once (for badge calc)
    const completedTaskIds = new Set(Object.keys(completionsByTask));

    // 4. Aggregate points
    const { totalPoints, pointsByCategory } = aggregatePoints(completions);

    // 5. Compute level
    const levelInfo = computeLevel({ totalPoints, pointsByCategory, gradeLevel });

    // 6. Compute badges
    const badges = computeBadges(allActiveTasks, completedTaskIds);

    // 7. Build enriched task list grouped by yearTarget
    const tasksByYear = {};
    for (const task of allActiveTasks) {
      const taskId = task._id.toString();
      const yr = String(task.yearTarget);
      if (!tasksByYear[yr]) tasksByYear[yr] = [];

      const compSummary = completionsByTask[taskId] || null;

      tasksByYear[yr].push({
        _id: taskId,
        title: task.title,
        description: task.description,
        category: task.category,
        points: task.points,
        yearTarget: task.yearTarget,
        sortOrder: task.sortOrder,
        maxCompletions: task.maxCompletions,
        isCompleted: !!compSummary,
        completionCount: compSummary ? compSummary.count : 0,
        latestCompletion: compSummary
          ? {
              completedAt: compSummary.latest.createdAt,
              pointsAwarded: compSummary.latest.pointsAwarded,
              cappedAtStanding: compSummary.latest.cappedAtStanding,
              capReason: compSummary.latest.capReason,
            }
          : null,
      });
    }

    res.json({
      student: {
        name: req.user.name,
        gradeLevel,
        standingCap: STANDING_CAPS[gradeLevel] ?? 10,
      },
      levelInfo,
      badges,
      tasksByYear,
      summary: {
        totalTasksAvailable: allActiveTasks.length,
        totalTasksCompleted: completedTaskIds.size,
        totalPoints,
        pointsByCategory,
      },
    });
  } catch (err) {
    console.error("GET /scoreboard/me error:", err);
    res.status(500).json({ message: "Failed to fetch scoreboard", error: err.message });
  }
});

// ─── POST /api/scoreboard/complete/:taskId ────────────────────────────────────
// Marks a task as complete for the authenticated student.
router.post("/complete/:taskId", authenticateToken, async (req, res) => {
  try {
    const studentId = req.user._id;
    const gradeLevel = req.user.gradeLevel || "Freshman";
    const { taskId } = req.params;

    // 1. Verify the task exists and is active
    const task = await ScoreboardTask.findOne({ _id: taskId, isActive: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found or no longer active" });
    }

    // 2. Check maxCompletions limit
    if (task.maxCompletions !== null) {
      const existingCount = await TaskCompletion.countDocuments({
        student: studentId,
        task: taskId,
      });
      if (existingCount >= task.maxCompletions) {
        return res.status(409).json({
          message: `This task can only be completed ${task.maxCompletions} time(s)`,
        });
      }
    }

    // 3. Compute the student's current level to check against the standing cap
    const existingCompletions = await TaskCompletion.find({ student: studentId }).populate(
      "task",
      "category"
    );
    const { totalPoints, pointsByCategory } = aggregatePoints(existingCompletions);
    const levelResult = computeLevel({ totalPoints, pointsByCategory, gradeLevel });

    // 4. Determine points to award (0 if at cap)
    const atCap = levelResult.currentLevel >= levelResult.standingCap;
    const pointsAwarded = atCap ? 0 : task.points;
    const cappedAtStanding = atCap;
    const capReason = atCap
      ? `${gradeLevel} students can reach a maximum of Level ${levelResult.standingCap}. ` +
        `Your completion is recorded and counts toward badges.`
      : "";

    // 5. Save the completion
    const completion = new TaskCompletion({
      student: studentId,
      task: taskId,
      pointsAwarded,
      cappedAtStanding,
      capReason,
    });
    await completion.save();

    res.status(201).json({
      message: cappedAtStanding
        ? "Task recorded (0 points — standing cap reached)"
        : "Task completed!",
      completion: {
        _id: completion._id,
        task: {
          _id: task._id,
          title: task.title,
          category: task.category,
          points: task.points,
        },
        pointsAwarded,
        cappedAtStanding,
        capReason,
        completedAt: completion.createdAt,
      },
    });
  } catch (err) {
    console.error("POST /scoreboard/complete/:taskId error:", err);
    res.status(500).json({ message: "Failed to complete task", error: err.message });
  }
});

// ─── DELETE /api/scoreboard/complete/:taskId ──────────────────────────────────
// Undoes the most recent completion of a task for the authenticated student.
router.delete("/complete/:taskId", authenticateToken, async (req, res) => {
  try {
    const studentId = req.user._id;
    const { taskId } = req.params;
    const isAdmin = req.user.userType === "Admin";

    // Build the filter — admins can undo any student's completion if they pass
    // a studentId query param; otherwise the student can only undo their own.
    const filter = isAdmin && req.query.studentId
      ? { student: req.query.studentId, task: taskId }
      : { student: studentId, task: taskId };

    // Find the most recent completion for this (student, task) pair
    const completion = await TaskCompletion.findOne(filter).sort({ createdAt: -1 });
    if (!completion) {
      return res.status(404).json({ message: "No completion record found" });
    }

    await TaskCompletion.findByIdAndDelete(completion._id);

    res.json({ message: "Task completion removed successfully" });
  } catch (err) {
    console.error("DELETE /scoreboard/complete/:taskId error:", err);
    res.status(500).json({ message: "Failed to undo completion", error: err.message });
  }
});

export default router;
