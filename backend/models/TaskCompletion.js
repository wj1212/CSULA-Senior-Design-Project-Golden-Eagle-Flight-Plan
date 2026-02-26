import mongoose from "mongoose";

const TaskCompletionSchema = new mongoose.Schema(
  {
    // The student who completed the task
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Which task was completed
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScoreboardTask",
      required: true,
    },

    // Snapshot of points at completion time.
    // Equals task.points when cap was NOT hit; equals 0 when cap WAS hit.
    // Snapshotted so historical scores stay accurate even if task.points changes.
    pointsAwarded: { type: Number, required: true, min: 0 },

    // True when the student was at their standing cap at completion time.
    // If true, pointsAwarded === 0.
    cappedAtStanding: { type: Boolean, default: false },

    // Human-readable explanation when cappedAtStanding is true.
    capReason: { type: String, default: "" },
  },
  { timestamps: true } // createdAt serves as the completion timestamp
);

// Fast lookup: all completions for a student, newest first
TaskCompletionSchema.index({ student: 1, createdAt: -1 });

// Fast lookup: completions for a specific student+task (for repeat-count checks)
TaskCompletionSchema.index({ student: 1, task: 1 });

// NOTE: No unique compound index on (student, task) — tasks can be repeatable.
// The route handler enforces maxCompletions via a countDocuments check.

export default mongoose.model("TaskCompletion", TaskCompletionSchema);
