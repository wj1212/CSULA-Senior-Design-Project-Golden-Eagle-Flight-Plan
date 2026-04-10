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
import TaskCompletion from "./models/TaskCompletion.js";
import { allTasks } from "./seed/scoreboardData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Auto-seed scoreboard tasks on startup.
// Forces a re-seed if stale PROFESSIONAL_SKILLS tasks are detected (schema migration).
// Otherwise seeds only when the collection is empty (first run).
// Also cleans up orphaned completions that reference deleted tasks.
async function autoSeedScoreboard() {
  const staleCount = await ScoreboardTask.countDocuments({ category: "PROFESSIONAL_SKILLS" });
  const totalCount = await ScoreboardTask.countDocuments();

  // Also detect tasks missing the requiresEvent field (added in the event-linking update).
  // If any "Attend" tasks lack requiresEvent, the seed data is outdated and needs a refresh.
  const missingRequiresEvent = await ScoreboardTask.countDocuments({
    title: /^Attend /i,
    requiresEvent: { $ne: true },
  });

  if (staleCount > 0 || totalCount === 0 || missingRequiresEvent > 0) {
    if (staleCount > 0) {
      console.log(`🔄 Re-seeding scoreboard: ${staleCount} stale task(s) detected`);
    }
    if (missingRequiresEvent > 0) {
      console.log(`🔄 Re-seeding scoreboard: ${missingRequiresEvent} task(s) missing requiresEvent`);
    }
    await ScoreboardTask.deleteMany({});
    await TaskCompletion.deleteMany({});
    console.log("🧹 Cleared old task completions (orphaned by re-seed)");
    await ScoreboardTask.insertMany(allTasks);
    console.log(`✅ Scoreboard tasks seeded (${allTasks.length} tasks)`);
  }

  // Clean up orphaned completions referencing tasks that no longer exist
  const validTaskIds = (await ScoreboardTask.find({}, "_id")).map((t) => t._id);
  const orphanResult = await TaskCompletion.deleteMany({ task: { $nin: validTaskIds } });
  if (orphanResult.deletedCount > 0) {
    console.log(`🧹 Removed ${orphanResult.deletedCount} orphaned completion(s)`);
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
