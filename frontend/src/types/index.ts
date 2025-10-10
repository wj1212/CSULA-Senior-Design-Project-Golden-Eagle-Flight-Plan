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

export interface NavigationScreens {
  Dashboard: undefined;
  Opportunities: undefined;
  Courses: undefined;
  Plan: undefined;
  Community: undefined;
  Settings: undefined;
}