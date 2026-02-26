import mongoose from "mongoose";

const CATEGORIES = [
  "ACADEMIC_PROGRESS",
  "CAREER_PREP",
  "PROFESSIONAL_SKILLS",
  "COMMUNITY_LEADERSHIP",
];

const ScoreboardTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, default: "" },

    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },

    // Points awarded on completion (actual points may be 0 if cap hit — see TaskCompletion)
    points: { type: Number, required: true, min: 1 },

    // Which academic year this task is grouped under (1–4)
    yearTarget: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },

    // Display order within its category+year group (lower = shown first)
    sortOrder: { type: Number, default: 0 },

    // null = unlimited repeats; 1 = one-time only; N = up to N completions
    maxCompletions: { type: Number, default: 1 },

    // Soft-delete: false hides the task without losing completion history
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ScoreboardTaskSchema.index({ yearTarget: 1, category: 1, isActive: 1 });

export default mongoose.model("ScoreboardTask", ScoreboardTaskSchema);
