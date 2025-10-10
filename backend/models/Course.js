import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    units: { type: Number, required: true },
    prerequisites: { type: [String], default: [] },
    semester: { type: Number, required: true, min: 1, max: 8 },
    category: { 
      type: String, 
      enum: ["Lower Division Core", "Upper Division Core", "Elective", "Math", "Physics", "English", "GE"],
      required: true 
    },
    isElective: { type: Boolean, default: false },
    description: { type: String, default: "" },
    isRequired: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
