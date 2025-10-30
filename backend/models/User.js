import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    userType: {
      type: String,
      enum: ["Student", "Faculty", "Admin"], // you can add more later
      required: true,
      default: "Student",
    },
    //Student Profile info
    gradeLevel: {
      type: String,
      enum: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"],
      default: "Freshman",
    },
    major: { type: String, default: "" },
    degreeType: { type: String, default: "Bachelor" },
    gpa: { type: Number, min: 0, max: 4, default: 0 },

    // Academic info
    financialStatus: {
      type: String,
      enum: ["Unspecified",",Scholarship Recipient","Financial Aid (FAFSA)","Work-Study","Out-of-Pocket","Other"],
      default: "Unspecified",
    },
    commuteStatus: {
      type: String,
      enum: ["On-Campus","Off-Campus (Near Campus)","Commuter (Local)","Remote/Online"],
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
