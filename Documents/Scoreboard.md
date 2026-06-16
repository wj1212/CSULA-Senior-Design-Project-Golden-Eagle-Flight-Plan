# Scoreboard System — Documentation

A gamified 4-year milestone tracking system for CSULA students. Students earn points by completing tasks across 3 engagement categories, level up through 10 levels organized into 4 Eagle tiers, and earn year-completion badges. Faculty can view any student's full scoreboard progress.

---

## Eagle Tiers

| Tier | Name | Unlocks at Level |
|---|---|---|
| Year 1 | Baby Eagle | 0 (always visible) |
| Year 2 | Fledgling Eagle | Level 4 |
| Year 3 | Soaring Eagle | Level 6 |
| Year 4 | Golden Eagle | Level 8 |

---

## Categories

Tasks are organized into **3** engagement categories (previously 4 — "Professional Skills" was removed):

| Category | Color |
|---|---|
| Academic Progress | Purple (`#552583`) |
| Career Prep | Gold (`#ca8a04`) |
| Community & Leadership | Green (`#16a34a`) |

---

## Level System

- **10 levels** total
- Points required per level defined in `LEVEL_THRESHOLDS` in `levelCalculator.js`
- Advancing past Level 1 requires **category diversity** — not just total points:
  - Levels 2–3: points in at least **2 of 3** categories (≥100 pts each)
  - Levels 4–10: points in **all 3** categories (≥100 pts each)
- **Standing cap:** Currently set to Level 10 for all grade levels (Freshman through Graduate). The cap infrastructure exists in `STANDING_CAPS` and can be adjusted per grade if needed in the future.

---

## Backend

### New Files

**`backend/models/ScoreboardTask.js`**
Mongoose schema for the task catalog.
- Fields: `title`, `description`, `category` (enum: 3 categories), `points`, `yearTarget` (1–4), `maxCompletions` (null = unlimited, integer = limited), `requiresEvent` (Boolean), `isActive`
- `requiresEvent: true` means the student must link an RSVP'd event to complete the task

**`backend/models/TaskCompletion.js`**
Per-student completion journal. One document per completion instance.
- Fields: `student` (ref User), `task` (ref ScoreboardTask), `pointsAwarded` (snapshot at time of completion), `cappedAtStanding` (Boolean), `capReason` (String), `linkedEvent` (ref Event, nullable)

**`backend/utils/levelCalculator.js`**
Pure computation module — no DB calls. All scoreboard math lives here.
- `computeLevel({ totalPoints, pointsByCategory, gradeLevel })` — returns full level result including current level, progress %, next level threshold, diversity status
- `computeBadges(allActiveTasks, completedTaskIds)` — returns badge array per year
- Exports: `LEVEL_THRESHOLDS`, `STANDING_CAPS`, `YEAR_UNLOCK_LEVEL`, `YEAR_LABELS`, `MIN_CATEGORY_POINTS`

**`backend/seed/scoreboardData.js`**
Single source of truth for all task definitions. Edit this file to add, change, or remove tasks. Imported by the server on startup.

**`backend/seed/seedScoreboard.js`**
Manual reset script (`npm run seed:scoreboard`). Wipes and re-inserts all tasks. Only needed when resetting data — the server auto-seeds on first startup when the collection is empty.

### Modified Files

**`backend/server.js`**
- Registered `/api/scoreboard` routes
- Added `autoSeedScoreboard()` — runs on startup, seeds tasks only when `ScoreboardTask` collection is empty

**`backend/routes/scoreboard.js`**
Six REST endpoints:

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/scoreboard/tasks` | GET | Any | Task catalog; optional `?yearTarget` and `?category` filters |
| `/api/scoreboard/me` | GET | Student | Full progress: level, badges, tasks by year (tier-filtered by student's level) |
| `/api/scoreboard/complete/:taskId` | POST | Student | Mark task complete; validates event RSVP if `requiresEvent`; enforces max completions and standing cap |
| `/api/scoreboard/complete/:taskId` | DELETE | Student/Admin | Undo most recent completion of a task |
| `/api/scoreboard/student/:studentId` | GET | Faculty/Admin | Full scoreboard view for any student — shows all tiers regardless of student's unlock level |
| `/api/scoreboard/eligible-events/:taskId` | GET | Student | Returns events the student has RSVP'd to that match the task's category and haven't been used for this task yet |

---

## Frontend

### New Files

**`frontend/src/services/scoreboardService.ts`**
API client for all scoreboard operations:
- `getMyProgress()` — fetches `/api/scoreboard/me`
- `getTasks(filters?)` — fetches task catalog
- `completeTask(taskId, eventId?)` — POST to complete a task (eventId required for event-linked tasks)
- `undoTask(taskId)` — DELETE to undo most recent completion
- `getStudentProgress(studentId)` — faculty call to `/api/scoreboard/student/:id`
- `getEligibleEvents(taskId)` — fetches eligible events for event-linked tasks

**`frontend/src/screens/student/ScoreboardScreen.tsx`**
Main student scoreboard screen:
- **Level Hero Card** — current level number, XP progress bar, tier name pill, points-to-next-level hint
- **Stats row** — total points, tasks completed, categories qualifying
- **Category breakdown** — progress bars per category with point totals
- **Badges grid** — 2×2 Eagle tier badge cards; earned vs. locked state with completion count
- **Year accordion** — collapsible sections per tier; Year 1 expanded by default; locked tiers show unlock requirement
- **Task rows** — color-coded by category, shows category dot + completion status; Mark Complete / Undo buttons
- **Event picker modal** — shown when a task requires an event; lists eligible RSVP'd events
- **Toast notifications** — green (success), red (error), amber (info); replaces Alert.alert for web compatibility
- Pull-to-refresh and error state with Retry button

**`frontend/src/screens/faculty/StudentProfileViewer.tsx`**
Faculty-facing student scoreboard view (significantly upgraded from original):
- **Level card** — student's current level, tier name, progress bar
- **Stats row** — total points, tasks completed, categories qualifying
- **Category breakdown** — per-category point totals with progress bars
- **Eagle tier badge grid** — 2×2 badge cards showing earned/locked status
- **Task accordion by tier** — all 4 tiers visible to faculty regardless of student's unlock level; expandable task rows showing completion status and date

### Modified Files

**`frontend/src/types/index.ts`**
TypeScript interfaces (updated from original 4-category version):
- `ScoreboardCategory` — union type of 3 category strings
- `ScoreboardTask`, `TaskCompletionSummary`, `LevelInfo`, `ScoreboardBadge`, `ScoreboardProgress`, `CompleteTaskResponse`, `TierStatus`, `EligibleEvent`

**`frontend/src/navigation/BottomTabNavigator.tsx`**
- Replaced PlaceholderScreen with `ScoreboardScreen` on the Plan tab
- Icon: `trophy` / `trophy-outline`, label: `Scoreboard`

---

## Event-Linked Tasks

Some tasks have `requiresEvent: true`. When a student tries to complete one:
1. The frontend calls `getEligibleEvents(taskId)` to show a picker of valid events
2. An eligible event must: (a) have a matching `scoreboardCategory`, (b) have the student in its `attendees` array, (c) not have already been used for this specific task
3. The student selects an event and the `eventId` is sent with the completion POST
4. The backend validates all three conditions before recording the completion

This links real campus event attendance to scoreboard progress.

---

## Seeding / Resetting Tasks

- On first backend startup (empty collection): tasks are auto-seeded from `seed/scoreboardData.js`
- To reset tasks: delete all documents from the `scoreboardtasks` collection in MongoDB Atlas, then restart the backend
- To add/edit tasks: modify `seed/scoreboardData.js`, wipe the collection, restart

---

## Key Constants (levelCalculator.js)

```js
MIN_CATEGORY_POINTS = 100        // Points needed in a category for it to count toward diversity

LEVEL_THRESHOLDS = [
  0,    // Level 1 — everyone starts here
  0,
  250,  // Level 2
  600,  // Level 3
  1000, // Level 4  ← Year 2 unlocks
  1500, // Level 5
  2100, // Level 6  ← Year 3 unlocks
  2800, // Level 7
  3600, // Level 8  ← Year 4 unlocks
  4500, // Level 9
  5500, // Level 10
]

YEAR_UNLOCK_LEVEL = { 1: 0, 2: 4, 3: 6, 4: 8 }

STANDING_CAPS = { Freshman: 10, Sophomore: 10, Junior: 10, Senior: 10, Graduate: 10 }
```
