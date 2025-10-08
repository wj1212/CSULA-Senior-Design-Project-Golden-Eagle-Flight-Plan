import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },

    // Optional profile fields
    gradeLevel: { type: String, default: "Freshman" },
    major: { type: String, default: "" },
    degreeType: { type: String, default: "Bachelor" },
    completedCourses: { type: [String], default: [] },
    currentCourses: { type: [String], default: [] },
    careerInterests: { type: [String], default: [] },
    disabilities: { type: [String], default: [] },
    availability: {
      type: [{ day: String, slot: String }],
      default: [],
    },
    recommendedCourses: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
