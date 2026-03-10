import mongoose from "mongoose";

const ProfileConfigSchema = new mongoose.Schema(
  {
    // Majors available for students
    majors: {
      type: [String],
      default: [
        "Computer Science",
        "Information Systems",
        "Engineering",
        "Business Administration",
        "Psychology",
        "Biology",
        "Nursing",
        "Education",
        "Sociology",
      ],
    },

    // Financial status options
    financialStatuses: {
      type: [String],
      default: [
        "Scholarship Recipient",
        "Financial Aid (FAFSA)",
        "Work-Study",
        "Out-of-Pocket",
        "Other",
      ],
    },

    // Grade level options
    gradeLevels: {
      type: [String],
      default: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"],
    },

    // Commute status options
    commuteStatuses: {
      type: [String],
      default: [
        "On-Campus Housing",
        "Off-Campus (Near Campus)",
        "Commuter (Local)",
        "Remote/Online",
      ],
    },

    // OSD (Office of Students with Disabilities) accommodation options
    osdOptions: {
      type: [String],
      default: [
        "Extended Test Time",
        "Note-taking Assistance",
        "Accessible Classroom",
        "Alternative Exam Format",
        "Assistive Technology",
        "Interpreter Services",
        "Mobility Assistance",
        "Medication Management",
      ],
    },

    // Career interest categories (stored as object with major as key)
    careerInterests: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        "Computer Science": [
          "Software Engineering",
          "AI / Machine Learning",
          "Cybersecurity",
          "Game Development",
          "Data Science",
          "Research",
        ],
        "Information Systems": [
          "IT Support",
          "Database Administration",
          "Systems Analysis",
          "Project Management",
          "Business Analytics",
        ],
        "Business Administration": [
          "Finance",
          "Marketing",
          "Entrepreneurship",
          "Human Resources",
          "Operations Management",
        ],
        Engineering: [
          "Mechanical Design",
          "Electrical Systems",
          "Civil Infrastructure",
          "Robotics",
          "Product Development",
        ],
        Psychology: [
          "Clinical Practice",
          "Counseling",
          "Human Resources",
          "Neuroscience",
          "Education",
        ],
        Biology: [
          "Biotechnology",
          "Healthcare",
          "Research",
          "Pharmaceuticals",
          "Environmental Science",
        ],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProfileConfig", ProfileConfigSchema);
