// ─── Constants ────────────────────────────────────────────────────────────────

// Minimum points a student must have in a category for it to "count" toward
// the category diversity requirement when unlocking a new level.
// Change this single value to adjust the threshold globally.
export const MIN_CATEGORY_POINTS = 100;

// Points required to reach each level.
// Index 0 is unused. LEVEL_THRESHOLDS[n] = points needed for level n.
export const LEVEL_THRESHOLDS = [
  0,    // index 0: placeholder
  0,    // Level 1  — everyone starts here
  250,  // Level 2
  600,  // Level 3
  1000, // Level 4  ← Year 1 suggested target
  1500, // Level 5
  2100, // Level 6  ← Year 2 suggested target
  2800, // Level 7
  3600, // Level 8  ← Year 3 suggested target
  4500, // Level 9
  5500, // Level 10 ← Year 4 suggested target
];

// Maximum level a student can reach based on their academic standing.
// Keys must match the gradeLevel enum values in the User model exactly.
export const STANDING_CAPS = {
  Freshman:  4,
  Sophomore: 6,
  Junior:    8,
  Senior:    10,
  Graduate:  10,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * How many categories must have MIN_CATEGORY_POINTS+ to unlock a given level.
 * Returns 0 for level 1 (no diversity requirement to start).
 */
function requiredCategoryDiversity(targetLevel) {
  if (targetLevel <= 1) return 0;
  if (targetLevel <= 3) return 2; // Levels 2–3
  if (targetLevel <= 6) return 3; // Levels 4–6
  return 4;                       // Levels 7–10
}

// ─── Main Exports ─────────────────────────────────────────────────────────────

/**
 * computeLevel
 *
 * Given a student's aggregated data, returns their current level and
 * next-level progress information. No DB calls — pure computation.
 *
 * @param {object} params
 * @param {number} params.totalPoints       Sum of all pointsAwarded for this student
 * @param {object} params.pointsByCategory  Map of category → total points earned
 *                                          e.g. { ACADEMIC_PROGRESS: 300, CAREER_PREP: 150, ... }
 * @param {string} params.gradeLevel        Student's gradeLevel ("Freshman" | "Sophomore" | ...)
 *
 * @returns {object} LevelResult
 */
export function computeLevel({ totalPoints, pointsByCategory, gradeLevel }) {
  const standingCap = STANDING_CAPS[gradeLevel] ?? 10;

  // Count categories that meet the minimum point threshold
  const qualifyingCategories = Object.values(pointsByCategory).filter(
    (pts) => pts >= MIN_CATEGORY_POINTS
  ).length;

  // Walk downward from level 10 to find the highest level the student qualifies for.
  // A student qualifies for level N if:
  //   1. totalPoints >= LEVEL_THRESHOLDS[N]
  //   2. qualifyingCategories >= requiredCategoryDiversity(N)
  let earnedLevel = 1;
  for (let lvl = 10; lvl >= 2; lvl--) {
    const pointsOk = totalPoints >= LEVEL_THRESHOLDS[lvl];
    const diversityOk = qualifyingCategories >= requiredCategoryDiversity(lvl);
    if (pointsOk && diversityOk) {
      earnedLevel = lvl;
      break;
    }
  }

  // Apply the standing cap (cap can only lower a level, never raise it)
  const effectiveLevel = Math.min(earnedLevel, standingCap);
  const isCapped = earnedLevel > standingCap;

  // ── Next-level progress ──
  const maxReachable = Math.min(standingCap, 10);
  const isMaxLevel = effectiveLevel >= maxReachable;

  let nextLevel = null;
  let nextLevelThreshold = null;
  let pointsToNextLevel = null;
  let nextLevelDiversityRequired = null;

  if (!isMaxLevel) {
    nextLevel = effectiveLevel + 1;
    nextLevelThreshold = LEVEL_THRESHOLDS[nextLevel];
    pointsToNextLevel = Math.max(0, nextLevelThreshold - totalPoints);
    nextLevelDiversityRequired = requiredCategoryDiversity(nextLevel);
  }

  // Progress percentage within the current level band (not global)
  let progressPercent = 100;
  if (!isMaxLevel) {
    const bandStart = LEVEL_THRESHOLDS[effectiveLevel];
    const bandEnd = LEVEL_THRESHOLDS[nextLevel];
    progressPercent = Math.min(
      100,
      Math.round(((totalPoints - bandStart) / (bandEnd - bandStart)) * 100)
    );
  }

  return {
    currentLevel: effectiveLevel,
    earnedLevel,
    standingCap,
    isCapped,
    capReason: isCapped
      ? `${gradeLevel} students can reach a maximum of Level ${standingCap}`
      : "",
    totalPoints,
    pointsByCategory,
    qualifyingCategories,
    nextLevel,
    nextLevelThreshold,
    pointsToNextLevel,
    nextLevelDiversityRequired,
    progressPercent,
    isMaxLevel,
  };
}

/**
 * computeBadges
 *
 * Determines which year-completion badges the student has earned.
 * A badge for year N is earned when the student has a completion for EVERY
 * active task with yearTarget === N. Capped (0-pt) completions still count.
 *
 * @param {object[]} allActiveTasks       All ScoreboardTask docs with isActive: true
 * @param {Set<string>} completedTaskIds  Set of task _id strings the student has completed
 *
 * @returns {object[]} Array of badge objects sorted by year ascending
 */
export function computeBadges(allActiveTasks, completedTaskIds) {
  // Group task IDs by yearTarget
  const tasksByYear = {};
  for (const task of allActiveTasks) {
    const yr = task.yearTarget;
    if (!tasksByYear[yr]) tasksByYear[yr] = [];
    tasksByYear[yr].push(task._id.toString());
  }

  const badges = [];
  for (const [year, taskIds] of Object.entries(tasksByYear)) {
    const totalForYear = taskIds.length;
    const completedForYear = taskIds.filter((id) => completedTaskIds.has(id)).length;
    const earned = totalForYear > 0 && completedForYear === totalForYear;

    badges.push({
      year: Number(year),
      label: `Year ${year} Eagle`,
      description: `Complete all Year ${year} milestone tasks`,
      earned,
      completedForYear,
      totalForYear,
    });
  }

  return badges.sort((a, b) => a.year - b.year);
}
