import { Course, RecommendedCourse, CourseRecommendations, CourseProgress } from '../types';
import { getStoredToken } from './authService';

// Detect if running on web
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Check if in development mode
const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

// API Base URL (same as authService)
const API_BASE_URL = isDev 
  ? (isWeb ? 'http://localhost:4000/api' : 'http://192.168.0.147:4000/api')
  : 'https://your-production-backend-url.com/api';

console.log('CourseService initialized with API_BASE_URL:', API_BASE_URL);

class CourseService {
  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await getStoredToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Get all CS courses
   */
  async getAllCourses(): Promise<Course[]> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw error;
    }
  }

  /**
   * Get personalized course recommendations
   */
  async getRecommendedCourses(): Promise<CourseRecommendations> {
    try {
      console.log('Fetching recommendations from:', `${API_BASE_URL}/courses/recommended`);
      const headers = await this.getAuthHeaders();
      console.log('Auth headers prepared');
      const response = await fetch(`${API_BASE_URL}/courses/recommended`, {
        headers,
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      if (data.success) {
        return data.data.recommendations;
      }
      throw new Error(data.error || 'Failed to get recommendations');
    } catch (error) {
      console.error('Error fetching recommended courses:', error);
      throw error;
    }
  }

  /**
   * Get course progress statistics
   */
  async getCourseProgress(): Promise<CourseProgress> {
    try {
      console.log('Fetching progress from:', `${API_BASE_URL}/courses/progress`);
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses/progress`, {
        headers,
      });

      console.log('Progress response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Progress response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Progress data:', data);
      if (data.success) {
        return data.data;
      }
      throw new Error(data.error || 'Failed to get progress');
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  }

  /**
   * Get specific course by code
   */
  async getCourseByCode(courseCode: string): Promise<Course | null> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses/${courseCode}`, {
        headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  /**
   * Search courses by name or code
   */
  async searchCourses(query: string): Promise<Course[]> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses/search/${encodeURIComponent(query)}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  }

  /**
   * Get courses by category
   */
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses?category=${encodeURIComponent(category)}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching courses by category:', error);
      throw error;
    }
  }

  /**
   * Get courses by semester
   */
  async getCoursesBySemester(semester: number): Promise<Course[]> {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/courses?semester=${semester}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching courses by semester:', error);
      throw error;
    }
  }

  /**
   * Check if prerequisites are met for a course
   */
  checkPrerequisitesMet(course: Course, completedCourses: string[]): boolean {
    if (!course.prerequisites || course.prerequisites.length === 0) {
      return true;
    }
    return course.prerequisites.every(prereq => completedCourses.includes(prereq));
  }

  /**
   * Get priority level for a course
   */
  getCoursePriority(course: RecommendedCourse, currentSemester: number): 'High' | 'Medium' | 'Low' {
    if (!course.prerequisitesMet) {
      return 'Low';
    }

    // High priority: Required courses for current/next semester
    if (course.isRequired && course.semester <= currentSemester + 1) {
      return 'High';
    }

    // Medium priority: Upper division courses or current semester electives
    if (course.category === 'Upper Division Core' || 
        (course.isElective && course.semester <= currentSemester + 1)) {
      return 'Medium';
    }

    // Low priority: Future courses or electives
    return 'Low';
  }

  /**
   * Format course code for display
   */
  formatCourseCode(courseCode: string): string {
    return courseCode.replace(/\s+/g, ' ').trim();
  }

  /**
   * Get semester name from number
   */
  getSemesterName(semester: number): string {
    const year = Math.ceil(semester / 2);
    const term = semester % 2 === 1 ? 'Fall' : 'Spring';
    return `Year ${year} ${term}`;
  }
}

export const courseService = new CourseService();
export default courseService;
