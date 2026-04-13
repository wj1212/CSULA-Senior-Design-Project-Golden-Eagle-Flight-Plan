import mongoose from "mongoose";

const MajorCurriculumSchema = new mongoose.Schema({
  major: { type: String, required: true, unique: true },

  description: { type: String, default: "" }, // for asterisk notes / explanations

  sections: [
    {
      title: { type: String, required: true }, // e.g. "Lower Division Core Courses"
      courses: [{ type: String, required: true }], // list of course strings
    },
  ],

  curriculumLink: { type: String, default: "" },
});

export default mongoose.model("MajorCurriculum", MajorCurriculumSchema);