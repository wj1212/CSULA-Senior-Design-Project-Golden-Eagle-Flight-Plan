import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db.js";
import MajorCurriculum from "../models/MajorCurriculum.js";
import { curriculumData } from "./curriculumData.js";

dotenv.config();

//run node seed/seedCurriculum.js
//^for when u add more courses to curriculumData file on seed 
async function seed() {
  try {

    await connectDB();
    await MajorCurriculum.deleteMany({});

    const inserted = await MajorCurriculum.insertMany(curriculumData);

    console.log(`✅ Inserted ${inserted.length} majors`);

    await mongoose.disconnect();
    console.log(" Disconnected DB");
  } catch (err) {
    console.error(" Seed failed:", err);
    process.exit(1);
  }
}

seed();