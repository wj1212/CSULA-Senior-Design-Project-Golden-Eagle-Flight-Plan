import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";
import scoreboardRoutes from "./routes/scoreboard.js";
import profileConfigRoutes from "./routes/profileConfig.js";
import ScoreboardTask from "./models/ScoreboardTask.js";
import { allTasks } from "./seed/scoreboardData.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Auto-seed scoreboard tasks on startup.
// Forces a re-seed if stale PROFESSIONAL_SKILLS tasks are detected (schema migration).
// Otherwise seeds only when the collection is empty (first run).
// Also cleans up orphaned completions that reference deleted tasks.
async function autoSeedScoreboard() {
  const totalCount = await ScoreboardTask.countDocuments();

  // Only seed when the collection is completely empty (first run or manual wipe).
  if (totalCount === 0) {
    await ScoreboardTask.insertMany(allTasks);
    console.log(`✅ Scoreboard tasks seeded (${allTasks.length} tasks)`);
  }
}

// connect to MongoDB with mongoose, then auto-seed
connectDB().then(autoSeedScoreboard);

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/scoreboard", scoreboardRoutes);
app.use("/api/profile-config", profileConfigRoutes);
app.use("/api", resourceRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
