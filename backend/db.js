import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL =
  process.env.DB_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/testDB"; // fallback local

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB with Mongoose`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
