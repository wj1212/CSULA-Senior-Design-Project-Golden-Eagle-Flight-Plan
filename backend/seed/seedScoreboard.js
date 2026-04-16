// Manual seed script — use this to RESET tasks to the default definitions.
// Tasks are normally auto-seeded on server startup, so you only need this
// script if you want to wipe and re-insert the task catalog.
//
// Usage (from the backend/ folder):
//   npm run seed:scoreboard

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import ScoreboardTask from "../models/ScoreboardTask.js";
import connectDB from "../db.js";
import { allTasks } from "./scoreboardData.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

async function seed() {
  await connectDB();

  console.log("Removing all existing ScoreboardTask documents...");
  await ScoreboardTask.deleteMany({});

  console.log(`Inserting ${allTasks.length} tasks...`);
  const inserted = await ScoreboardTask.insertMany(allTasks);
  console.log(`Inserted ${inserted.length} tasks.\n`);

  const summary = {};
  for (const t of inserted) {
    if (!summary[t.category]) summary[t.category] = { count: 0, points: 0 };
    summary[t.category].count += 1;
    summary[t.category].points += t.points;
  }
  console.table(summary);

  await mongoose.disconnect();
  console.log("\nDone.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
