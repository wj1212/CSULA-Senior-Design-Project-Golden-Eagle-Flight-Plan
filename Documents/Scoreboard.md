A brand-new Flight Scoreboard tab replacing the placeholder "Plan" tab in the student bottom navigator. Students earn points by completing milestone tasks across 4 categories, level up, and earn year-completion badges.

Backend (7 files)
🟢 Added New files:
• backend/models/ScoreboardTask.js — Mongoose schema for the task catalog. Fields: title, description, category (enum), points, yearTarget (1–4), maxCompletions (null = repeatable, 1 = one-time), isActive.
• backend/models/TaskCompletion.js — Per-student completion journal. Stores pointsAwarded as a snapshot, cappedAtStanding flag, and capReason if the student hit their grade-level cap.
• backend/utils/levelCalculator.js — Pure computation (no DB calls). Calculates current level using point thresholds + category diversity gates, applies standing caps, and computes year badges.
• backend/routes/scoreboard.js — 4 REST endpoints:

GET /api/scoreboard/tasks — task catalog with optional filters

GET /api/scoreboard/me — full student progress (level, badges, tasks by year)

POST /api/scoreboard/complete/:taskId — mark a task complete (enforces caps and repeat limits)

DELETE /api/scoreboard/complete/:taskId — undo the most recent completion of a task


• backend/seed/scoreboardData.js — Single source of truth for Year 1 task definitions (9 tasks across 4 categories). Imported by both server startup and the manual seed script.
• backend/seed/seedScoreboard.js — Manual reset script (npm run seed:scoreboard) to wipe and re-insert tasks. Only needed to reset data; server auto-seeds on first startup.

🟡 Modified files:
• backend/server.js — Registered scoreboard routes before the generic /api route (order matters in Express). Added autoSeedScoreboard() that runs once on server startup — teammates never need to run a seed script manually.

Frontend (5 files)
🟢 Added New files:
• frontend/src/services/scoreboardService.ts — API client with getTasks(), getMyProgress(), completeTask(taskId), undoTask(taskId). Uses EXPO_PUBLIC_API_URL env variable (no hardcoded IPs).
• frontend/src/screens/student/ScoreboardScreen.tsx — Main screen with:
Level Hero Card — level number, XP progress bar, grade level chip, pts-to-next-level hint, cap warning


Category Progress chips — 4 chips (Academic, Career, Skills, Community), highlighted gold when ≥100 pts

Badges row — trophy cards per year, earned vs. locked state

Year accordion — Year 1 expanded by default; collapsible sections per year

Task cards — color-coded by category, repeatable badge, Mark Complete / Do Again / Undo buttons

Toast notifications — green (success), red (error), amber (info) — replaces Alert.alert which doesn’t work on React Native Web

Pull-to-refresh and error state with Retry button

• frontend/.env.example — Template for teammates:
 EXPO_PUBLIC_API_URL=http://localhost:4000/api.
 Copy to .env and set your machine’s IP for device testing.

🟡 Modified files:
• frontend/src/types/index.ts — Added 7 TypeScript interfaces: ScoreboardCategory, ScoreboardTask, TaskCompletionSummary, LevelInfo, ScoreboardBadge, ScoreboardProgress, CompleteTaskResponse.
• frontend/src/navigation/BottomTabNavigator.tsx — Replaced PlaceholderScreen with ScoreboardScreen on the Plan tab. Changed icon to trophy, label to Scoreboard.
