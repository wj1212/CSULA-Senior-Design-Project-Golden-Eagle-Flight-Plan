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
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface NavigationScreens {
  Dashboard: undefined;
  Opportunities: undefined;
  Courses: undefined;
  Plan: undefined;
  Community: undefined;
  Settings: undefined;
}