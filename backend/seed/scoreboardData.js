// Shared task definitions used by both auto-seed (server startup) and
// the manual seed script. Edit this file to add/change tasks.
//
// maxCompletions: 1    = one-time only
// maxCompletions: null = repeatable (unlimited)

// ─── Baby Eagle — Year 1 ─────────────────────────────────────────────────────

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
    requiresEvent: true,
  },
  {
    title: "Complete time management or study skills module",
    description:
      "Finish an online or in-person module focused on time management or effective study strategies.",
    category: "CAREER_PREP",
    points: 100,
    yearTarget: 1,
    sortOrder: 3,
    maxCompletions: 1,
  },
  {
    title: "Complete intro technical or career skill module",
    description:
      "Finish an introductory module in a technical tool or career skill relevant to your major (e.g. Excel, Python basics, project management).",
    category: "CAREER_PREP",
    points: 100,
    yearTarget: 1,
    sortOrder: 4,
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
    requiresEvent: true,
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
    requiresEvent: true,
  },
];

// ─── Fledgling Eagle — Year 2 ─────────────────────────────────────────────────

export const year2Tasks = [
  // ── ACADEMIC_PROGRESS ────────────────────────────────────────────────────
  {
    title: "Meet with academic advisor each semester",
    description:
      "Schedule and attend an advising appointment every semester to review your degree progress and stay on track.",
    category: "ACADEMIC_PROGRESS",
    points: 150,
    yearTarget: 2,
    sortOrder: 0,
    maxCompletions: null,
  },
  {
    title: "Complete a writing-intensive course",
    description:
      "Finish a course that fulfills the Writing Intensive General Education requirement.",
    category: "ACADEMIC_PROGRESS",
    points: 200,
    yearTarget: 2,
    sortOrder: 1,
    maxCompletions: 1,
  },
  {
    title: "Earn a grade of B or better in a core major course",
    description:
      "Demonstrate academic proficiency by earning a B or higher in a foundational course required for your major.",
    category: "ACADEMIC_PROGRESS",
    points: 150,
    yearTarget: 2,
    sortOrder: 2,
    maxCompletions: null,
  },

  // ── CAREER_PREP ──────────────────────────────────────────────────────────
  {
    title: "Attend a career fair",
    description:
      "Visit the campus career fair and speak with at least 3 employers or graduate programs relevant to your field.",
    category: "CAREER_PREP",
    points: 150,
    yearTarget: 2,
    sortOrder: 0,
    maxCompletions: null,
    requiresEvent: true,
  },
  {
    title: "Complete a mock interview",
    description:
      "Schedule and complete a mock interview through the Career Center or with a faculty mentor to sharpen your interview skills.",
    category: "CAREER_PREP",
    points: 150,
    yearTarget: 2,
    sortOrder: 1,
    maxCompletions: 1,
  },
  {
    title: "Apply for a summer internship, research position, or job",
    description:
      "Submit at least one application for a summer opportunity — internship, research assistantship, or part-time job — relevant to your major.",
    category: "CAREER_PREP",
    points: 200,
    yearTarget: 2,
    sortOrder: 2,
    maxCompletions: null,
  },

  // ── COMMUNITY_LEADERSHIP ─────────────────────────────────────────────────
  {
    title: "Join a student organization",
    description:
      "Become a dues-paying or active member of at least one student club or professional organization on campus.",
    category: "COMMUNITY_LEADERSHIP",
    points: 100,
    yearTarget: 2,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Complete at least 4 hours of volunteer service",
    description:
      "Participate in a volunteer or community service activity and log at least 4 hours of service.",
    category: "COMMUNITY_LEADERSHIP",
    points: 100,
    yearTarget: 2,
    sortOrder: 1,
    maxCompletions: null,
  },
  {
    title: "Attend a leadership or professional development workshop",
    description:
      "Attend a workshop focused on leadership skills, communication, or personal and professional development.",
    category: "COMMUNITY_LEADERSHIP",
    points: 100,
    yearTarget: 2,
    sortOrder: 2,
    maxCompletions: null,
    requiresEvent: true,
  },
];

// ─── Soaring Eagle — Year 3 ───────────────────────────────────────────────────

export const year3Tasks = [
  // ── ACADEMIC_PROGRESS ────────────────────────────────────────────────────
  {
    title: "Declare or confirm your academic concentration or track",
    description:
      "Formally confirm any concentration, track, or option within your major with your academic advisor.",
    category: "ACADEMIC_PROGRESS",
    points: 150,
    yearTarget: 3,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Maintain a 3.0 GPA or above for a semester",
    description:
      "Achieve a semester GPA of 3.0 or higher as reported on your official transcript.",
    category: "ACADEMIC_PROGRESS",
    points: 200,
    yearTarget: 3,
    sortOrder: 1,
    maxCompletions: null,
  },
  {
    title: "Complete a significant group project or presentation",
    description:
      "Successfully complete and present a major group project as part of an upper-division course requirement.",
    category: "ACADEMIC_PROGRESS",
    points: 150,
    yearTarget: 3,
    sortOrder: 2,
    maxCompletions: null,
  },

  // ── CAREER_PREP ──────────────────────────────────────────────────────────
  {
    title: "Complete an internship or co-op experience",
    description:
      "Finish a formal internship, co-op, or structured work experience directly related to your major or career goals.",
    category: "CAREER_PREP",
    points: 300,
    yearTarget: 3,
    sortOrder: 0,
    maxCompletions: null,
  },
  {
    title: "Obtain a professional or technical certification",
    description:
      "Earn a recognized industry certification relevant to your career field (e.g. Google Analytics, AWS Cloud Practitioner, PMP, CompTIA).",
    category: "CAREER_PREP",
    points: 250,
    yearTarget: 3,
    sortOrder: 1,
    maxCompletions: null,
  },
  {
    title: "Build or update a professional portfolio",
    description:
      "Create or significantly update a portfolio — website, GitHub, or document — showcasing your projects, skills, and work samples.",
    category: "CAREER_PREP",
    points: 200,
    yearTarget: 3,
    sortOrder: 2,
    maxCompletions: null,
  },

  // ── COMMUNITY_LEADERSHIP ─────────────────────────────────────────────────
  {
    title: "Take on a leadership role in a student organization",
    description:
      "Hold an officer position, chair a committee, or lead a project within a campus organization.",
    category: "COMMUNITY_LEADERSHIP",
    points: 200,
    yearTarget: 3,
    sortOrder: 0,
    maxCompletions: null,
  },
  {
    title: "Mentor a first-year or sophomore student",
    description:
      "Volunteer to serve as a peer mentor or participate in a formal peer mentoring program to support a newer student.",
    category: "COMMUNITY_LEADERSHIP",
    points: 150,
    yearTarget: 3,
    sortOrder: 1,
    maxCompletions: null,
  },
  {
    title: "Organize or lead a campus event or initiative",
    description:
      "Plan and execute a campus event, workshop, or community initiative with your organization or student group.",
    category: "COMMUNITY_LEADERSHIP",
    points: 150,
    yearTarget: 3,
    sortOrder: 2,
    maxCompletions: null,
  },
];

// ─── Golden Eagle — Year 4 ────────────────────────────────────────────────────

export const year4Tasks = [
  // ── ACADEMIC_PROGRESS ────────────────────────────────────────────────────
  {
    title: "Apply to graduate",
    description:
      "Submit your graduation application by the published deadline for your intended degree conferral term.",
    category: "ACADEMIC_PROGRESS",
    points: 200,
    yearTarget: 4,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Complete a senior capstone project or thesis",
    description:
      "Successfully finish and defend or present your senior capstone, thesis, or design project as required by your program.",
    category: "ACADEMIC_PROGRESS",
    points: 350,
    yearTarget: 4,
    sortOrder: 1,
    maxCompletions: 1,
  },
  {
    title: "Attend commencement or graduation ceremony",
    description:
      "Participate in the university commencement ceremony to celebrate your academic achievement with the CSULA community.",
    category: "ACADEMIC_PROGRESS",
    points: 200,
    yearTarget: 4,
    sortOrder: 2,
    maxCompletions: 1,
  },

  // ── CAREER_PREP ──────────────────────────────────────────────────────────
  {
    title: "Secure a full-time job offer or graduate school acceptance",
    description:
      "Receive and accept a full-time employment offer or an acceptance letter to a graduate or professional program.",
    category: "CAREER_PREP",
    points: 400,
    yearTarget: 4,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Complete a comprehensive final resume review",
    description:
      "Have your final professional resume reviewed and polished by the Career Center or an industry professional before entering the workforce.",
    category: "CAREER_PREP",
    points: 150,
    yearTarget: 4,
    sortOrder: 1,
    maxCompletions: 1,
  },
  {
    title: "Network with 5 professionals in your field",
    description:
      "Connect with at least 5 working professionals in your field via LinkedIn, industry events, or informational interviews.",
    category: "CAREER_PREP",
    points: 200,
    yearTarget: 4,
    sortOrder: 2,
    maxCompletions: 1,
  },

  // ── COMMUNITY_LEADERSHIP ─────────────────────────────────────────────────
  {
    title: "Participate in a senior legacy or giving-back initiative",
    description:
      "Contribute to a senior class initiative, alumni outreach effort, or campus improvement project to leave your mark at CSULA.",
    category: "COMMUNITY_LEADERSHIP",
    points: 150,
    yearTarget: 4,
    sortOrder: 0,
    maxCompletions: 1,
  },
  {
    title: "Present at a research symposium or professional conference",
    description:
      "Share your academic or professional work at a recognized symposium, poster session, or industry conference.",
    category: "COMMUNITY_LEADERSHIP",
    points: 250,
    yearTarget: 4,
    sortOrder: 1,
    maxCompletions: null,
  },
  {
    title: "Serve as a student ambassador or campus representative",
    description:
      "Represent CSULA at a recruitment event, open house, or official campus function to support prospective and incoming students.",
    category: "COMMUNITY_LEADERSHIP",
    points: 150,
    yearTarget: 4,
    sortOrder: 2,
    maxCompletions: null,
  },
];

// All tasks across all years — spread in order.
export const allTasks = [
  ...year1Tasks,
  ...year2Tasks,
  ...year3Tasks,
  ...year4Tasks,
];
