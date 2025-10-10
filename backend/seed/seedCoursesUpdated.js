import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import connectDB from "../db.js";

dotenv.config();

const courses = [
  // ==================== FRESHMAN YEAR ====================
  
  // Freshman Fall (Semester 1) - 16 units
  {
    courseCode: "GE 1A",
    courseName: "Written Communication I",
    units: 3,
    prerequisites: [],
    semester: 1,
    category: "GE",
    description: "First-year writing course - Required GE",
    isRequired: true,
    isElective: false
  },
  // Note: GE 1B (Critical Thinking) is WAIVED for CS majors - satisfied by major courses combined
  {
    courseCode: "GE 1C",
    courseName: "Oral Communication",
    units: 3,
    prerequisites: [],
    semester: 1,
    category: "GE",
    description: "Oral communication and presentation skills - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "MATH 2110",
    courseName: "Calculus I",
    units: 4,
    prerequisites: [],
    semester: 1,
    category: "Math",
    description: "Differential calculus - Also satisfies GE Area 2 (Math/Quantitative Reasoning)",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 1010",
    courseName: "Introduction to Computer Science",
    units: 3,
    prerequisites: [],
    semester: 1,
    category: "Lower Division Core",
    description: "Introduction to programming and computer science concepts",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "GE 3A",
    courseName: "Arts & Humanities",
    units: 3,
    prerequisites: [],
    semester: 1,
    category: "GE",
    description: "Arts and humanities general education",
    isRequired: true,
    isElective: false
  },

  // Freshman Spring (Semester 2) - 14 units
  {
    courseCode: "US HIST",
    courseName: "U.S. History Requirement",
    units: 3,
    prerequisites: [],
    semester: 2,
    category: "GE",
    description: "U.S. history requirement - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 1222",
    courseName: "Object-Oriented Programming",
    units: 3,
    prerequisites: ["CS 1010"],
    semester: 2,
    category: "Lower Division Core",
    description: "Object-oriented programming concepts",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2011",
    courseName: "Data Structures",
    units: 4,
    prerequisites: ["CS 1222"],
    semester: 2,
    category: "Lower Division Core",
    description: "Data structures and algorithms",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "MATH 2120",
    courseName: "Calculus II",
    units: 4,
    prerequisites: ["MATH 2110"],
    semester: 2,
    category: "Math",
    description: "Integral calculus",
    isRequired: true,
    isElective: false
  },

  // ==================== SOPHOMORE YEAR ====================
  
  // Sophomore Fall (Semester 3) - 16 units
  {
    courseCode: "GE 3A (d)",
    courseName: "Arts & Humanities Diversity",
    units: 3,
    prerequisites: [],
    semester: 3,
    category: "GE",
    description: "Diversity in arts and humanities - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "GE 4 Gov't",
    courseName: "U.S. Government Requirement",
    units: 3,
    prerequisites: [],
    semester: 3,
    category: "GE",
    description: "U.S. government requirement - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2012",
    courseName: "Computer Organization",
    units: 4,
    prerequisites: ["CS 1222"],
    semester: 3,
    category: "Lower Division Core",
    description: "Computer organization and architecture",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2445",
    courseName: "Software Engineering Fundamentals",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 3,
    category: "Lower Division Core",
    description: "Software engineering principles",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2470",
    courseName: "Introduction to Databases",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 3,
    category: "Lower Division Core",
    description: "Database systems and SQL",
    isRequired: true,
    isElective: false
  },

  // Sophomore Spring (Semester 4) - 14 units
  {
    courseCode: "GE 4 (d)",
    courseName: "Social Science Diversity",
    units: 3,
    prerequisites: [],
    semester: 4,
    category: "GE",
    description: "Diversity in social sciences - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "ENGL 2030",
    courseName: "Writing Intensive",
    units: 3,
    prerequisites: ["GE 1A"],
    semester: 4,
    category: "English",
    description: "Advanced writing course - Required",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2013",
    courseName: "Discrete Structures for CS",
    units: 4,
    prerequisites: ["CS 1222"],
    semester: 4,
    category: "Lower Division Core",
    description: "Discrete mathematics for computer science",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 2148",
    courseName: "Programming Paradigms",
    units: 4,
    prerequisites: ["CS 2011"],
    semester: 4,
    category: "Lower Division Core",
    description: "Different programming paradigms",
    isRequired: true,
    isElective: false
  },

  // ==================== JUNIOR YEAR ====================
  
  // Junior Fall (Semester 5) - 14 units
  {
    courseCode: "MATH 2740",
    courseName: "Linear Algebra",
    units: 3,
    prerequisites: ["MATH 2110"],
    semester: 5,
    category: "Math",
    description: "Linear algebra and matrix operations - Required",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "GE 6",
    courseName: "Upper-Division GE Theme",
    units: 3,
    prerequisites: [],
    semester: 5,
    category: "GE",
    description: "Upper-division general education theme - Required GE",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3186",
    courseName: "Probability & Statistics for CS",
    units: 3,
    prerequisites: ["MATH 2740"],
    semester: 5,
    category: "Upper Division Core",
    description: "Probability and statistics - With CS 3112 satisfies UD GE Area 2 or 5",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3220",
    courseName: "Operating Systems",
    units: 4,
    prerequisites: ["CS 2011"],
    semester: 5,
    category: "Upper Division Core",
    description: "Operating systems concepts",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3338",
    courseName: "Professional Development",
    units: 1,
    prerequisites: [],
    semester: 5,
    category: "Upper Division Core",
    description: "Professional development skills",
    isRequired: true,
    isElective: false
  },

  // Junior Spring (Semester 6) - 15 units
  {
    courseCode: "CS 3035",
    courseName: "Web & Mobile Development",
    units: 3,
    prerequisites: ["CS 2445"],
    semester: 6,
    category: "Upper Division Core",
    description: "Web and mobile application development",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3112",
    courseName: "Algorithms",
    units: 3,
    prerequisites: ["CS 2011", "MATH 2110"],
    semester: 6,
    category: "Upper Division Core",
    description: "Analysis of algorithms - With CS 3186 satisfies UD GE Area 2 or 5",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3337",
    courseName: "Computer Networks",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 6,
    category: "Upper Division Core",
    description: "Computer networks and protocols - Required for CS 4961",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 3801",
    courseName: "Programming Languages",
    units: 3,
    prerequisites: ["CS 2148"],
    semester: 6,
    category: "Upper Division Core",
    description: "Programming language theory - Satisfies GE Area 3B (Humanities)",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 4440",
    courseName: "Computer Architecture",
    units: 3,
    prerequisites: ["CS 2012"],
    semester: 6,
    category: "Upper Division Core",
    description: "Computer architecture design",
    isRequired: true,
    isElective: false
  },

  // ==================== SENIOR YEAR ====================
  
  // Senior Fall (Semester 7) - 16 units
  {
    courseCode: "CS 4961",
    courseName: "Senior Project I",
    units: 3,
    prerequisites: ["CS 3112", "CS 3220", "CS 3337"],
    semester: 7,
    category: "Upper Division Core",
    description: "First semester of senior capstone - With CS 4962 satisfies UD GE Area 3 & 4 (wi)(cl)",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "PHYS 2100",
    courseName: "Physics I",
    units: 4,
    prerequisites: ["MATH 2110"],
    semester: 7,
    category: "Physics",
    description: "General physics I: mechanics - Satisfies GE Area 5A & 5C (Physical Science + Lab)",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS Elective 1",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 7,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },
  {
    courseCode: "CS Elective 2",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 7,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },
  {
    courseCode: "CS Elective 3",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 7,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },

  // Senior Spring (Semester 8) - 15 units
  {
    courseCode: "CS 4962",
    courseName: "Senior Project II",
    units: 3,
    prerequisites: ["CS 4961"],
    semester: 8,
    category: "Upper Division Core",
    description: "Second semester of senior capstone - With CS 4961 satisfies UD GE Area 3 & 4 (wi)(cl)",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS 4963",
    courseName: "Senior Project III",
    units: 3,
    prerequisites: ["CS 4962"],
    semester: 8,
    category: "Upper Division Core",
    description: "Final semester of senior capstone project",
    isRequired: true,
    isElective: false
  },
  {
    courseCode: "CS Elective 4",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 8,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },
  {
    courseCode: "CS Elective 5",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 8,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },
  {
    courseCode: "CS Elective 6",
    courseName: "CS Elective (choose from list)",
    units: 3,
    prerequisites: [],
    semester: 8,
    category: "Elective",
    description: "Choose any CS elective from approved list",
    isRequired: false,
    isElective: true
  },

  // ==================== CS ELECTIVES (18 units total required) ====================
  
  {
    courseCode: "CS 4075",
    courseName: "Concurrent and Distributed Programming",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Concurrent and distributed programming concepts"
  },
  {
    courseCode: "CS 4188",
    courseName: "Compilers",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Compiler design and construction"
  },
  {
    courseCode: "CS 4220",
    courseName: "Current Trends in Web Design and Development",
    units: 3,
    prerequisites: ["CS 2445"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Modern web development trends"
  },
  {
    courseCode: "CS 4222",
    courseName: "Principles of Database Systems",
    units: 3,
    prerequisites: ["CS 2470"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Advanced database systems"
  },
  {
    courseCode: "CS 4470",
    courseName: "Computer Networking Protocols",
    units: 3,
    prerequisites: ["CS 3337"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Network protocols and standards"
  },
  {
    courseCode: "CS 4471",
    courseName: "Computer Networks Configuration and Management",
    units: 3,
    prerequisites: ["CS 3337"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Network configuration and management"
  },
  {
    courseCode: "CS 4472",
    courseName: "Computer and Cyber Security",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Cybersecurity fundamentals"
  },
  {
    courseCode: "CS 4540",
    courseName: "Topics in Advanced Computer Science",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Special topics in computer science"
  },
  {
    courseCode: "CS 4550",
    courseName: "Computer Graphics",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Computer graphics and visualization"
  },
  {
    courseCode: "CS 4551",
    courseName: "Multimedia Software Systems",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Multimedia systems development"
  },
  {
    courseCode: "CS 4555",
    courseName: "Introduction to 3D Computer Game Programming",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "3D game development fundamentals"
  },
  {
    courseCode: "CS 4635",
    courseName: "Modeling and Simulation",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Computer modeling and simulation"
  },
  {
    courseCode: "CS 4660",
    courseName: "Artificial Intelligence",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Introduction to artificial intelligence"
  },
  {
    courseCode: "CS 4661",
    courseName: "Introduction to Data Science",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Data science fundamentals"
  },
  {
    courseCode: "CS 4662",
    courseName: "Advanced Machine Learning and Deep Learning",
    units: 3,
    prerequisites: ["CS 4661"],
    semester: 8,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Advanced machine learning techniques"
  },
  {
    courseCode: "CS 4665",
    courseName: "Introduction to Data Visualization",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Data visualization techniques"
  },
  {
    courseCode: "CS 4780",
    courseName: "Cryptography and Information Security",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Cryptography and information security"
  },
  {
    courseCode: "CS 4875",
    courseName: "Human Centered Computing",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Human-computer interaction"
  },
  {
    courseCode: "EE 3445",
    courseName: "Computer Organization",
    units: 3,
    prerequisites: ["CS 2011"],
    semester: 7,
    category: "Elective",
    isElective: true,
    isRequired: false,
    description: "Advanced computer organization (Engineering elective)"
  }
];

const seedCourses = async () => {
  try {
    await connectDB();
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");
    
    // Insert all courses
    await Course.insertMany(courses);
    console.log(`Successfully seeded ${courses.length} courses`);
    
    // Display summary
    const requiredCourses = courses.filter(c => c.isRequired).length;
    const electives = courses.filter(c => c.isElective).length;
    console.log(`\nBreakdown:`);
    console.log(`- Required courses: ${requiredCourses}`);
    console.log(`- Elective courses: ${electives}`);
    console.log(`- Total: ${courses.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
