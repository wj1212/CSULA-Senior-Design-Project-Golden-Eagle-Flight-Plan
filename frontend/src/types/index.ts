export interface User {
  id: string;
  name: string;
  email: string;
  major: string;
  year: string;
  gpa: number;
  credits: number;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'Internship' | 'Research' | 'Leadership';
  deadline: string;
  match: number;
  description: string;
  link: string;
}

export interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  units: number;
  prerequisites: string[];
  semester: number;
  category: 'Lower Division Core' | 'Upper Division Core' | 'Elective' | 'Math' | 'Physics' | 'English' | 'GE';
  isElective: boolean;
  description: string;
  isRequired: boolean;
}

export interface RecommendedCourse extends Course {
  prerequisitesMet: boolean;
  reason: string;
}

export interface CourseRecommendations {
  currentSemester: number;
  currentSemesterCourses: RecommendedCourse[];
  nextSemesterCourses: RecommendedCourse[];
  futureCourses: RecommendedCourse[];
  unavailableCourses: RecommendedCourse[];
  totalAvailable: number;
  totalUnavailable: number;
}

export interface CourseProgress {
  totalCourses: number;
  completedCount: number;
  remainingCount: number;
  completionPercentage: number;
  totalUnits: number;
  completedUnits: number;
  remainingUnits: number;
  categoryStats: {
    [category: string]: {
      total: number;
      completed: number;
    };
  };
}

// ─── Scoreboard Types ──────────────────────────────────────────────────────

export type ScoreboardCategory =
  | 'ACADEMIC_PROGRESS'
  | 'CAREER_PREP'
  | 'COMMUNITY_LEADERSHIP';

export interface TierStatus {
  year: 1 | 2 | 3 | 4;
  unlocked: boolean;
  requiredLevel: number;
}

export interface EligibleEvent {
  _id: string;
  title: string;
  date: string;
  location?: string;
  scoreboardCategory: string;
}

export interface TaskCompletionSummary {
  completedAt: string;
  pointsAwarded: number;
  cappedAtStanding: boolean;
  capReason: string;
}

export interface ScoreboardTask {
  _id: string;
  title: string;
  description: string;
  category: ScoreboardCategory;
  points: number;
  yearTarget: 1 | 2 | 3 | 4;
  sortOrder: number;
  maxCompletions: number | null;
  requiresEvent: boolean;
  isCompleted: boolean;
  completionCount: number;
  latestCompletion: TaskCompletionSummary | null;
}

export interface LevelInfo {
  currentLevel: number;
  earnedLevel: number;
  standingCap: number;
  isCapped: boolean;
  capReason: string;
  totalPoints: number;
  pointsByCategory: Record<ScoreboardCategory, number>;
  qualifyingCategories: number;
  nextLevel: number | null;
  nextLevelThreshold: number | null;
  pointsToNextLevel: number | null;
  nextLevelDiversityRequired: number | null;
  progressPercent: number;
  isMaxLevel: boolean;
}

export interface ScoreboardBadge {
  year: 1 | 2 | 3 | 4;
  label: string;
  description: string;
  earned: boolean;
  completedForYear: number;
  totalForYear: number;
}

export interface ScoreboardProgress {
  student: {
    name: string;
    gradeLevel: string;
    standingCap: number;
  };
  levelInfo: LevelInfo;
  badges: ScoreboardBadge[];
  tasksByYear: Record<string, ScoreboardTask[]>;
  tierStatus: TierStatus[];
  summary: {
    totalTasksAvailable: number;
    totalTasksCompleted: number;
    totalPoints: number;
    pointsByCategory: Record<ScoreboardCategory, number>;
  };
}

export interface CompleteTaskResponse {
  message: string;
  completion: {
    _id: string;
    task: {
      _id: string;
      title: string;
      category: ScoreboardCategory;
      points: number;
    };
    pointsAwarded: number;
    cappedAtStanding: boolean;
    capReason: string;
    completedAt: string;
  };
}

export interface NavigationScreens {
  Dashboard: undefined;
  Courses: undefined;
  Plan: undefined;
  Community: undefined;
  Settings: undefined;
}