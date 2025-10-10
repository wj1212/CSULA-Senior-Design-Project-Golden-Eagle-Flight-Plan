import Course from "../models/Course.js";

/**
 * Check if all prerequisites for a course are satisfied
 * @param {Object} course - Course object with prerequisites array
 * @param {Array} completedCourses - Array of completed course codes
 * @returns {boolean} - True if all prerequisites are met
 */
export const checkPrerequisites = (course, completedCourses) => {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return true;
  }
  
  return course.prerequisites.every(prereq => 
    completedCourses.includes(prereq)
  );
};

/**
 * Calculate the student's current semester level based on completed courses
 * @param {Array} completedCourses - Array of completed course codes
 * @returns {number} - Estimated semester (1-8)
 */
export const calculateSemesterLevel = (completedCourses) => {
  // Key milestone courses for semester estimation
  const semesterMilestones = {
    1: ["CS 1010", "MATH 2110", "GE 1A"],
    2: ["CS 1222", "CS 2011", "MATH 2120"],
    3: ["CS 2012", "CS 2445", "CS 2470"],
    4: ["CS 2013", "CS 2148", "ENGL 2030"],
    5: ["CS 3220", "CS 3186", "CS 3338"],
    6: ["CS 3035", "CS 3112", "CS 3337", "CS 3801", "CS 4440"],
    7: ["CS 4961", "PHYS 2100"],
    8: ["CS 4962", "CS 4963"]
  };

  let maxSemester = 0;
  
  for (const [semester, courses] of Object.entries(semesterMilestones)) {
    const semesterNum = parseInt(semester);
    const completedInSemester = courses.filter(course => 
      completedCourses.includes(course)
    ).length;
    
    // If student has completed majority of courses in this semester
    if (completedInSemester >= Math.ceil(courses.length * 0.5)) {
      maxSemester = Math.max(maxSemester, semesterNum);
    }
  }

  return Math.max(1, maxSemester);
};

/**
 * Get personalized course recommendations based on completed courses
 * @param {Array} completedCourses - Array of completed course codes
 * @returns {Promise<Object>} - Object with categorized recommendations
 */
export const getRecommendedCourses = async (completedCourses) => {
  try {
    const allCourses = await Course.find({}).sort({ semester: 1, courseCode: 1 });
    const currentSemester = calculateSemesterLevel(completedCourses);
    
    const availableCourses = [];
    const unavailableCourses = [];
    
    // Categorize all courses
    for (const course of allCourses) {
      const isCompleted = completedCourses.includes(course.courseCode);
      const prerequisitesMet = checkPrerequisites(course, completedCourses);
      
      if (isCompleted) {
        continue; // Skip completed courses
      }
      
      const courseInfo = {
        ...course.toObject(),
        prerequisitesMet,
        reason: prerequisitesMet ? 
          `Available for semester ${course.semester}` : 
          `Missing prerequisites: ${course.prerequisites.join(', ')}`
      };
      
      if (prerequisitesMet) {
        availableCourses.push(courseInfo);
      } else {
        unavailableCourses.push(courseInfo);
      }
    }
    
    // Prioritize courses
    const prioritizedCourses = prioritizeCourses(availableCourses, currentSemester);
    
    // Categorize recommendations
    const currentSemesterCourses = prioritizedCourses.filter(course => 
      course.semester <= currentSemester + 1
    );
    
    const nextSemesterCourses = prioritizedCourses.filter(course => 
      course.semester === currentSemester + 2
    );
    
    const futureCourses = prioritizedCourses.filter(course => 
      course.semester > currentSemester + 2
    );
    
    return {
      currentSemester: currentSemester,
      currentSemesterCourses,
      nextSemesterCourses,
      futureCourses,
      unavailableCourses: unavailableCourses.slice(0, 10), // Limit to avoid overwhelming
      totalAvailable: availableCourses.length,
      totalUnavailable: unavailableCourses.length
    };
    
  } catch (error) {
    console.error("Error getting recommended courses:", error);
    throw error;
  }
};

/**
 * Prioritize available courses based on importance and timing
 * @param {Array} availableCourses - Array of available courses
 * @param {number} currentSemester - Student's current semester
 * @returns {Array} - Prioritized list of courses
 */
export const prioritizeCourses = (availableCourses, currentSemester) => {
  return availableCourses.sort((a, b) => {
    // Priority 1: Required courses over electives
    if (a.isRequired !== b.isRequired) {
      return a.isRequired ? -1 : 1;
    }
    
    // Priority 2: Core courses over non-core
    const aIsCore = ['Lower Division Core', 'Upper Division Core'].includes(a.category);
    const bIsCore = ['Lower Division Core', 'Upper Division Core'].includes(b.category);
    
    if (aIsCore !== bIsCore) {
      return aIsCore ? -1 : 1;
    }
    
    // Priority 3: Courses for current/next semester
    const aIsUrgent = a.semester <= currentSemester + 1;
    const bIsUrgent = b.semester <= currentSemester + 1;
    
    if (aIsUrgent !== bIsUrgent) {
      return aIsUrgent ? -1 : 1;
    }
    
    // Priority 4: Lower division before upper division
    if (a.category !== b.category) {
      const categoryOrder = {
        'Lower Division Core': 1,
        'Upper Division Core': 2,
        'Math': 3,
        'Physics': 4,
        'English': 5,
        'GE': 6,
        'Elective': 7
      };
      return categoryOrder[a.category] - categoryOrder[b.category];
    }
    
    // Priority 5: Earlier semester first
    if (a.semester !== b.semester) {
      return a.semester - b.semester;
    }
    
    // Priority 6: Alphabetical by course code
    return a.courseCode.localeCompare(b.courseCode);
  });
};

/**
 * Get course progress statistics
 * @param {Array} completedCourses - Array of completed course codes
 * @returns {Promise<Object>} - Progress statistics
 */
export const getCourseProgress = async (completedCourses) => {
  try {
    const allCourses = await Course.find({});
    const totalCourses = allCourses.length;
    const completedCount = completedCourses.length;
    
    // Count by category
    const categoryStats = {};
    for (const course of allCourses) {
      if (!categoryStats[course.category]) {
        categoryStats[course.category] = { total: 0, completed: 0 };
      }
      categoryStats[course.category].total++;
      
      if (completedCourses.includes(course.courseCode)) {
        categoryStats[course.category].completed++;
      }
    }
    
    // Calculate total units
    let totalUnits = 0;
    let completedUnits = 0;
    
    for (const course of allCourses) {
      totalUnits += course.units;
      if (completedCourses.includes(course.courseCode)) {
        completedUnits += course.units;
      }
    }
    
    return {
      totalCourses,
      completedCount,
      remainingCount: totalCourses - completedCount,
      completionPercentage: Math.round((completedCount / totalCourses) * 100),
      totalUnits,
      completedUnits,
      remainingUnits: totalUnits - completedUnits,
      categoryStats
    };
    
  } catch (error) {
    console.error("Error getting course progress:", error);
    throw error;
  }
};
