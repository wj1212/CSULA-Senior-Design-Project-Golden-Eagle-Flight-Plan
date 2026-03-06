import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const checkUsers = async () => {
  try {
    const mongoURL = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/testDB";
    await mongoose.connect(mongoURL);

    console.log("Connected to MongoDB");

    // Get all users
    const users = await User.find({}).select("name email userType cin");

    console.log(`Found ${users.length} users:`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Type: ${user.userType}, CIN: ${user.cin || 'N/A'}`);
    });

    // Get students specifically
    const students = await User.find({ userType: "Student" });
    console.log(`\nFound ${students.length} students with userType: "Student"`);

    // Get faculty specifically
    const faculty = await User.find({ userType: "Faculty" }).select("name email status");
    console.log(`\nFaculty users:`);
    faculty.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Status: ${user.status}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

checkUsers();