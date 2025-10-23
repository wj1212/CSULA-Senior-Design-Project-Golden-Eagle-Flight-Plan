import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },

    // Profile info
    gradeLevel: {
      type: String,
      enum: ["Freshman", "Sophomore", "Junior", "Senior"],
      default: "Freshman",
    },
    major: { type: String, default: "" },
    degreeType: { type: String, default: "Bachelor" },
    gpa: { type: Number, min: 0, max: 4, default: 0 },

    // Academic info
    financialStatus: {
      type: String,
      enum: ["Unspecified", "Full Aid", "Partial Aid", "Self-Funded"],
      default: "Unspecified",
    },
    commuteStatus: {
      type: String,
      enum: ["On-Campus", "Commuter", "Remote"],
      default: "On-Campus",
    },
    credits: { type: Number, min: 0, default: 0 },

    // Interests and accessibility
    careerInterests: { type: [String], default: [] },
    osd: { type: [String], default: [] }, // accessibility or disability options
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
