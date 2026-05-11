# Golden Eagle Flight Plan — New Team Handoff Guide

**Project:** Golden Eagle Flight Plan (GEFP)
**Institution:** Cal State LA (CSULA)
**Prepared for:** Incoming development team
**Date:** May 2026

---

## What Is This Project?

The Golden Eagle Flight Plan is a mobile + web application for CSULA that helps students track their four-year academic and professional development journey. It connects students with campus resources, events, and a gamified milestone system (the Scoreboard) that rewards engagement across three pillars: Academic Progress, Career Development, and Community & Leadership.

There are three user types in the system:
- **Student** — tracks progress, browses personalized resources/events, completes scoreboard tasks
- **Faculty/Advisor** — posts resources and events, looks up individual student scoreboard profiles
- **Admin** — approves incoming faculty and student organization account requests

---

## Repository

The repo is hosted on GitHub. Clone it and work off the `main` branch (the main active branch as of handoff).

```
git clone <repo-url>
cd CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan
git checkout testing
```

The repo has two top-level directories:
- `backend/` — Node.js + Express API server
- `frontend/` — React Native + Expo mobile/web app

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native, Expo SDK 54, TypeScript |
| Navigation | React Navigation (Bottom Tab + Stack) |
| Backend | Node.js, Express v5 |
| Database | MongoDB Atlas (cloud-hosted) |
| ODM | Mongoose |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Icons | Ionicons (via @expo/vector-icons) |
| Dev target | iOS, Android, Web (via Expo) |

---

## Prerequisites

Before you can run the project you need:

1. **Node.js** (v18 or later) — https://nodejs.org
2. **npm** (comes with Node)
3. **Expo CLI** — `npm install -g expo-cli` or use `npx expo`
4. **Expo Go app** on your phone (iOS or Android) for mobile testing
5. Access to the **MongoDB Atlas** cluster (ask the previous team for the connection string)
6. A `.env` file in `backend/` (see Environment Variables section below)
7. A `.env` file in `frontend/` (see Environment Variables section below)

---

## Environment Variables

### Backend — `backend/.env`

Create this file manually. It is git-ignored and never committed.

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=<any long random string>
PORT=4000
```

- `MONGO_URI` — get this from MongoDB Atlas. Go to your cluster → Connect → Drivers → copy the connection string and fill in your password.
- `JWT_SECRET` — can be any long random string. Used to sign/verify auth tokens. Keep it secret.
- `PORT` — 4000 is the default. Don't change unless you have a conflict.

### Frontend — `frontend/.env`

Copy `frontend/.env.example` to `frontend/.env` and edit it:

```
# For web dev (browser):
EXPO_PUBLIC_API_URL=http://localhost:4000/api

# For mobile dev on your phone (Expo Go):
# Replace with your computer's LAN IP address
# Run `ipconfig` (Windows) or `ifconfig` (Mac) to find it
EXPO_PUBLIC_API_URL=http://192.168.x.x:4000/api
```

**Important:** When testing on a physical phone via Expo Go, `localhost` will not work because your phone is a different device on the network. Use your computer's local IP address instead.

---

## Running the Project

### Start the Backend

```bash
cd backend
npm install
npm start
```

The server starts on port 4000. You should see:
```
🚀 Server running on port 4000
✅ Scoreboard tasks seeded (X tasks)   ← only on first run
```

The scoreboard tasks are auto-seeded on first startup when the collection is empty. You don't need to run any seed scripts manually.

### Start the Frontend

```bash
cd frontend
npm install
npx expo start
```

This opens the Expo dev tools in your browser. From there:
- Press `w` to open in browser
- Scan the QR code with Expo Go on your phone for mobile testing
- Press `i` for iOS simulator (Mac only) or `a` for Android emulator

---

## Project Structure

### Backend

```
backend/
├── server.js              # Entry point — Express setup, middleware, route mounting
├── db.js                  # MongoDB Atlas connection via Mongoose
├── .env                   # Secret config (git-ignored — you create this)
├── middleware/
│   └── auth.js            # authenticateToken middleware (JWT verification)
├── models/
│   ├── User.js            # User schema (Student, Faculty, Admin, StudentOrg)
│   ├── Resource.js        # Faculty-created resource links
│   ├── Event.js           # Faculty-created events (with RSVP + scoreboard category)
│   ├── ScoreboardTask.js  # Milestone task definitions (the task catalog)
│   ├── TaskCompletion.js  # Records each time a student completes a task
│   └── ProfileConfig.js   # Faculty profile configuration
├── routes/
│   ├── auth.js            # /api/auth — register, login, profile, change-password
│   ├── resources.js       # /api/resources, /api/events, /api/hashtags, RSVP
│   ├── scoreboard.js      # /api/scoreboard — student progress, task completion
│   └── profileConfig.js   # /api/profile-config
├── utils/
│   └── levelCalculator.js # Pure functions: computeLevel(), computeBadges()
└── seed/
    ├── scoreboardData.js  # The actual task data (edit here to change tasks)
    └── seedScoreboard.js  # Manual seed script (usually not needed)
```

### Frontend

```
frontend/
├── App.tsx                # Root component
├── .env                   # API URL config (git-ignored — you create this)
├── .env.example           # Template for .env
└── src/
    ├── navigation/
    │   └── BottomTabNavigator.tsx   # Tab bar setup and screen routing
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginPage.tsx
    │   │   ├── Registration.tsx
    │   │   └── RegLogin.tsx
    │   ├── student/
    │   │   ├── HomeScreen.tsx       # Landing page with quick actions
    │   │   ├── ScoreboardScreen.tsx # Gamified progress tracker
    │   │   ├── ResourcesScreen.tsx  # Resources + events with For You/All toggle
    │   │   ├── AIScreen.tsx         # Static AI feature preview (Coming Soon)
    │   │   ├── ProfileScreen.tsx    # Edit student profile
    │   │   └── SettingsScreen.tsx   # Password, notifications, sign out
    │   ├── faculty/
    │   │   ├── FacultyDashboard.tsx      # Post/manage resources and events
    │   │   ├── StudentProfileViewer.tsx  # View a student's scoreboard
    │   │   └── ProfileConfigurationPage.tsx
    │   └── admin/
    │       └── AdminDashboard.tsx   # Approve/deny pending accounts
    ├── services/
    │   ├── authService.ts           # Login, register, profile API calls
    │   ├── resourceService.ts       # Resources, events, RSVP API calls
    │   └── scoreboardService.ts     # Scoreboard API calls
    ├── context/
    │   └── AuthContext.tsx          # Global auth state (user, login, logout)
    ├── types/
    │   └── index.ts                 # TypeScript interfaces for all data shapes
    └── constants/
        └── colors.ts                # CSULA brand colors (navy/gold)
```

---

## How the Scoreboard System Works

This is the most complex and unique feature of the app. Read this carefully.

### Concept
Students earn points by completing milestone tasks. Tasks are grouped into 4 "Eagle tiers" (years) and 3 categories:
- **Academic Progress** (purple)
- **Career Prep** (gold)
- **Community & Leadership** (green)

### Levels
- There are 10 levels total.
- To advance, students need BOTH enough total points AND points in enough categories (category diversity).
- Levels 2–3 require points in at least 2 of 3 categories.
- Levels 4–10 require points in all 3 categories.

### Eagle Tiers
| Tier | Name | Unlocks at Level |
|---|---|---|
| Year 1 | Baby Eagle | 0 (always visible) |
| Year 2 | Fledgling Eagle | Level 4 |
| Year 3 | Soaring Eagle | Level 6 |
| Year 4 | Golden Eagle | Level 8 |

### Key Files
- `backend/utils/levelCalculator.js` — all level/badge logic lives here as pure functions (no DB calls). This is the heart of the scoreboard.
- `backend/seed/scoreboardData.js` — the task catalog. Edit this file to add, change, or remove tasks. The server auto-seeds on startup when the collection is empty.
- `backend/routes/scoreboard.js` — all scoreboard API endpoints.
- `frontend/src/screens/student/ScoreboardScreen.tsx` — the student-facing scoreboard UI.
- `frontend/src/screens/faculty/StudentProfileViewer.tsx` — faculty view of any student's progress.

### Event-Linked Tasks
Some tasks require the student to RSVP to a real event before they can mark the task complete. The event must have a matching `scoreboardCategory`. This links real campus attendance to scoreboard progress.

---

## How Personalization Works

The Resources tab has a "For You" / "All" toggle:
- **For You** sends `?personalized=true` to the API
- The backend (`routes/resources.js`) filters results by matching the resource/event hashtags against the student's `gradeLevel`, `major`, and `careerInterests`
- Matching is case-insensitive and ignores punctuation (normalized via `normalizeTag()`)
- Resources/events with **no hashtags** are shown to everyone regardless of mode

Faculty can add grade-level hashtags (freshman, sophomore, junior, senior, graduate) using quick-tap chip buttons when creating/editing posts.

---

## Authentication Flow

1. User registers → credentials stored in MongoDB with bcrypt-hashed password
2. Faculty and StudentOrg accounts require Admin approval (`isApproved: false` by default)
3. Login → server verifies password with bcrypt → returns a JWT token
4. Frontend stores token in Expo SecureStore
5. Every protected API call includes `Authorization: Bearer <token>` header
6. `middleware/auth.js` (`authenticateToken`) verifies the token and attaches the decoded user to `req.user`

---

## User Roles and Access

| Role | Can Do |
|---|---|
| Student | View/complete scoreboard tasks, browse resources/events, RSVP to events, edit own profile |
| Faculty | Everything a student can + create/edit/delete resources and events + view any student's scoreboard |
| Admin | Everything + approve/deny Faculty and StudentOrg account registrations |
| StudentOrg | Create/edit/delete resources and events (same as Faculty for content) |

---

## Known Incomplete / Future Work

These features were planned or started but not fully implemented — the new team should pick these up:

1. **AI Advisor Chatbot** — The AI tab (`AIScreen.tsx`) is currently a static mockup showing what the UI will look like. The actual Claude/LLM integration needs to be built. The UI design is done — just needs the real API calls wired in.

2. **AI Resume Grader** — Same situation as above. The UI preview exists in `AIScreen.tsx`. Needs real resume parsing and feedback logic connected to an AI API.

3. **Scoreboard task seeding** — The current task data in `seed/scoreboardData.js` is placeholder/example data. The actual milestone tasks for each year and category should be defined with the CSULA Provost Office.

4. **Admin dashboard enhancements** — Basic approval workflow exists but could be extended (e.g., reject with a reason, view all approved accounts, revoke access).

5. **Push notifications** — `notificationPrefs` fields exist on the User model but no actual notification sending is implemented.

6. **CSULA SSO integration** — The app currently uses its own username/password auth. Future plan was to integrate with CSULA's single sign-on (SSO/CAS) system so students log in with their CSULA credentials.

---

## API Reference (Quick Summary)

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/register` | POST | None | Register a new account |
| `/api/auth/login` | POST | None | Login, returns JWT |
| `/api/auth/profile` | GET/PUT | Any | Get or update own profile |
| `/api/auth/change-password` | POST | Any | Change password |
| `/api/resources` | GET | Any | List resources (`?personalized=true` or `?hashtag=x`) |
| `/api/resources` | POST | Faculty/Admin/StudentOrg | Create resource |
| `/api/resources/:id` | PUT/DELETE | Creator/Admin | Edit or delete resource |
| `/api/events` | GET | Any | List events |
| `/api/events` | POST | Faculty/Admin/StudentOrg | Create event |
| `/api/events/:id/rsvp` | POST/DELETE | Student | RSVP or cancel RSVP |
| `/api/hashtags` | GET | Any | All hashtags in use |
| `/api/scoreboard/me` | GET | Student | Own scoreboard data |
| `/api/scoreboard/tasks` | GET | Any | Task catalog |
| `/api/scoreboard/complete/:taskId` | POST | Student | Complete a task |
| `/api/scoreboard/complete/:taskId` | DELETE | Student/Admin | Undo completion |
| `/api/scoreboard/student/:studentId` | GET | Faculty/Admin | View any student's scoreboard |
| `/api/scoreboard/eligible-events/:taskId` | GET | Student | Events eligible for a task |

---

## Common Issues and Tips

**"Network request failed" on mobile**
→ You're using `localhost` in your `.env`. Change `EXPO_PUBLIC_API_URL` to your computer's LAN IP (e.g., `http://192.168.1.5:4000/api`). Run `ipconfig` on Windows to find your IP.

**Scoreboard tasks not appearing**
→ The task collection may be empty. Restart the backend — it auto-seeds on startup if the collection is empty. If tasks exist but are wrong, wipe the `ScoreboardTask` collection from MongoDB Atlas and restart.

**"Unauthorized" errors on API calls**
→ Token may be expired or missing. Log out and log back in to get a fresh token.

**Faculty/StudentOrg account can't log in after registering**
→ These account types require Admin approval. Log in as Admin and approve the account in the Admin Dashboard.

**Changes to scoreboard task data not reflecting**
→ Edit `backend/seed/scoreboardData.js`, then wipe the `scoreboardtasks` collection in MongoDB Atlas, and restart the backend to re-seed.

**TypeScript errors after adding new fields**
→ Update `frontend/src/types/index.ts` to match any new fields you add to backend responses.

---

## Database (MongoDB Atlas)

The database is hosted on MongoDB Atlas. You'll need:
1. An Atlas account with access to the GEFP project cluster
2. The connection string for the `.env` file

**Collections in use:**
- `users`
- `resources`
- `events`
- `scoreboardtasks`
- `taskcompletions`
- `profileconfigs`

To reset the scoreboard tasks: delete all documents from the `scoreboardtasks` collection in Atlas, then restart the backend.

---

## Getting Oriented — Recommended Reading Order

If you're new to the project, read the files in this order to build understanding:

1. `backend/models/User.js` — understand what a user looks like
2. `backend/utils/levelCalculator.js` — understand how the scoreboard computes levels
3. `backend/routes/scoreboard.js` — understand the scoreboard API
4. `backend/routes/resources.js` — understand resources, events, and personalization
5. `frontend/src/context/AuthContext.tsx` — understand how auth state flows through the app
6. `frontend/src/navigation/BottomTabNavigator.tsx` — understand how screens are organized
7. `frontend/src/screens/student/ScoreboardScreen.tsx` — the most complex student screen
8. `frontend/src/screens/faculty/FacultyDashboard.tsx` — the faculty-facing features

---

## Contact

If you have questions about design decisions or need access to credentials (MongoDB Atlas, GitHub), reach out to the previous team through your project coordinator at the CSULA Provost Office.
