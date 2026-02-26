// Shared task definitions used by both auto-seed (server startup) and
// the manual seed script. Edit this file to add/change tasks.
//
// maxCompletions: 1    = one-time only
// maxCompletions: null = repeatable (unlimited)

export const year1Tasks = [
  // ── ACADEMIC_PROGRESS ────────────────────────────────────────────────────
  {
    title: "Create degree plan",
    description:
      "Meet with your academic advisor and build a complete 4-year degree plan tailored to your major.",
    category: "ACADEMIC_PROGRESS",
    points: 200,
    yearTarget: 1,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Complete registration readiness checklist",
    description:
      "Finish the registration readiness checklist before your enrollment appointment to ensure you are prepared to register for classes.",
    category: "ACADEMIC_PROGRESS",
    points: 100,
    yearTarget: 1,
    sortOrder: 1,
    maxCompletions: 1,
  },

  // ── CAREER_PREP ──────────────────────────────────────────────────────────
  {
    title: "Upload first resume draft",
    description:
      "Create and upload your first resume draft to the career center portal for review.",
    category: "CAREER_PREP",
    points: 150,
    yearTarget: 1,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Create or update LinkedIn profile",
    description:
      "Set up a professional LinkedIn profile with your photo, education, and any relevant experience.",
    category: "CAREER_PREP",
    points: 100,
    yearTarget: 1,
    sortOrder: 1,
    maxCompletions: 1,
  },
  {
    title: "Attend a career workshop",
    description:
      "Participate in a career services workshop on resume writing, interviewing, or networking.",
    category: "CAREER_PREP",
    points: 100,
    yearTarget: 1,
    sortOrder: 2,
    maxCompletions: null,
  },

  // ── PROFESSIONAL_SKILLS ──────────────────────────────────────────────────
  {
    title: "Complete time management or study skills module",
    description:
      "Finish an online or in-person module focused on time management or effective study strategies.",
    category: "PROFESSIONAL_SKILLS",
    points: 100,
    yearTarget: 1,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Complete intro technical or career skill module",
    description:
      "Finish an introductory module in a technical tool or career skill relevant to your major (e.g. Excel, Python basics, project management).",
    category: "PROFESSIONAL_SKILLS",
    points: 100,
    yearTarget: 1,
    sortOrder: 1,
    maxCompletions: 1,
  },

  // ── COMMUNITY_LEADERSHIP ─────────────────────────────────────────────────
  {
    title: "Attend a club meeting or campus event",
    description:
      "Show up to at least one student organization meeting or campus event to explore your interests and start building your campus community.",
    category: "COMMUNITY_LEADERSHIP",
    points: 75,
    yearTarget: 1,
    sortOrder: 0,
    maxCompletions: null,
  },
  {
    title: "Volunteer or attend a campus activity",
    description:
      "Volunteer for a campus initiative or attend a university-hosted community activity.",
    category: "COMMUNITY_LEADERSHIP",
    points: 75,
    yearTarget: 1,
    sortOrder: 1,
    maxCompletions: null,
  },
];

// All tasks across all years — extend this array as Year 2, 3, 4 tasks are added.
export const allTasks = [...year1Tasks];
