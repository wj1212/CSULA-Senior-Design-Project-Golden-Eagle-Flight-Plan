import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Common fields for all user types
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    userType: {
      type: String,
      enum: ["Student", "Faculty", "Admin", "Student Organization"],
      required: true,
      default: "Student",
    },

    // ==================== STUDENT PROFILE FIELDS (Students only) ====================
    // These fields should ONLY exist for users with userType: "Student"
    // No defaults - these are explicitly set only during Student registration

    gradeLevel: {
      type: String,
      enum: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"],
    },
    major: String,
    degreeType: String,
    gpa: {
      type: Number,
      min: 0,
      max: 4,
    },

    // Academic info
    financialStatus: {
      type: String,
      enum: ["Unspecified", "Scholarship Recipient", "Financial Aid (FAFSA)", "Work-Study", "Out-of-Pocket", "Other"],
    },
    commuteStatus: {
      type: String,
      enum: ["On-Campus", "Off-Campus (Near Campus)", "Commuter (Local)", "Remote/Online"],
    },
    credits: Number,

    // Interests
    careerInterests: [String],

    // ==================== SENSITIVE STUDENT DATA (Privacy Controlled) ====================
    // OSD (Disability Services) information - SENSITIVE DATA
    // Only visible to the student themselves and authorized faculty
    // Only exists for Student accounts
    osd: {
      type: [String],
      select: false, // Exclude by default in queries for privacy
    },
    osdPrivacy: {
      type: String,
      enum: ["private", "public"],
      // Only set for Student accounts
      // private = hidden from faculty
      // public = visible to faculty
    },
  },
  { timestamps: true }
);

// Index for faster student lookups
UserSchema.index({ userType: 1 });

export default mongoose.model("User", UserSchema);
