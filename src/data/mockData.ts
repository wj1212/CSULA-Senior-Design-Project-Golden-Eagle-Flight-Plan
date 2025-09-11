import { User, Opportunity, Course } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  major: 'Computer Science',
  year: 'Junior',
  gpa: 3.7,
  credits: 85,
};

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Internship',
    company: 'Tech Corp',
    type: 'Internship',
    deadline: '2025-03-15',
    match: 92,
    description: 'Full-stack development internship with modern technologies.',
  },
  {
    id: '2',
    title: 'AI Research Project',
    company: 'University Lab',
    type: 'Research',
    deadline: '2025-02-28',
    match: 87,
    description: 'Machine learning research in natural language processing.',
  },
  {
    id: '3',
    title: 'Student Government VP',
    company: 'Student Council',
    type: 'Leadership',
    deadline: '2025-04-01',
    match: 75,
    description: 'Leadership role in student government activities.',
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS 301',
    name: 'Algorithms & Data Structures',
    credits: 3,
    priority: 'High',
  },
  {
    id: '2',
    code: 'CS 320',
    name: 'Software Engineering',
    credits: 3,
    priority: 'High',
  },
  {
    id: '3',
    code: 'MATH 280',
    name: 'Statistics',
    credits: 3,
    priority: 'Medium',
  },
];