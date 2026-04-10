import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import scoreboardService from '../../services/scoreboardService';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';
import { ScoreboardProgress, ScoreboardTask, ScoreboardCategory, TierStatus, EligibleEvent } from '../../types';

// ─── Category display config ──────────────────────────────────────────────────

const CATEGORY_LABEL: Record<ScoreboardCategory, string> = {
  ACADEMIC_PROGRESS: 'Academic',
  CAREER_PREP: 'Career',
  COMMUNITY_LEADERSHIP: 'Community',
};

const CATEGORY_COLOR: Record<ScoreboardCategory, string> = {
  ACADEMIC_PROGRESS: '#552583',
  CAREER_PREP: '#ca8a04',
  COMMUNITY_LEADERSHIP: '#16a34a',
};

const CATEGORY_ICON: Record<ScoreboardCategory, keyof typeof Ionicons.glyphMap> = {
  ACADEMIC_PROGRESS: 'school-outline',
  CAREER_PREP: 'briefcase-outline',
  COMMUNITY_LEADERSHIP: 'people-outline',
};

const ALL_CATEGORIES: ScoreboardCategory[] = [
  'ACADEMIC_PROGRESS',
  'CAREER_PREP',
  'COMMUNITY_LEADERSHIP',
];

const YEAR_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Baby Eagle',
  2: 'Fledgling Eagle',
  3: 'Soaring Eagle',
  4: 'Golden Eagle',
};

const YEAR_UNLOCK_LEVEL: Record<1 | 2 | 3 | 4, number> = {
  1: 0,
  2: 4,
  3: 6,
  4: 8,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LevelHeroProps {
  progress: ScoreboardProgress;
}

const LevelHero: React.FC<LevelHeroProps> = ({ progress }) => {
  const { levelInfo, student } = progress;

  return (
    <View style={heroStyles.card}>
      <View style={heroStyles.topRow}>
        <View style={heroStyles.levelBadge}>
          <Text style={heroStyles.levelNumber}>{levelInfo.currentLevel}</Text>
          <Text style={heroStyles.levelLabel}>Level</Text>
        </View>
        <View style={heroStyles.rightInfo}>
          <Text style={heroStyles.gradePill}>{student.gradeLevel}</Text>
          <Text style={heroStyles.totalPts}>{levelInfo.totalPoints.toLocaleString()} pts total</Text>
          {!levelInfo.isMaxLevel && (
            <Text style={heroStyles.nextLevelHint}>
              {levelInfo.pointsToNextLevel} pts to Level {levelInfo.nextLevel}
            </Text>
          )}
          {levelInfo.isMaxLevel && (
            <Text style={heroStyles.maxLevelText}>Max level reached!</Text>
          )}
        </View>
      </View>

      {/* XP progress bar */}
      {!levelInfo.isMaxLevel && (
        <View style={heroStyles.barTrack}>
          <View style={[heroStyles.barFill, { width: `${levelInfo.progressPercent}%` }]} />
        </View>
      )}

      {/* Variety hint */}
      {!levelInfo.isMaxLevel && levelInfo.nextLevelDiversityRequired !== null && (
        <Text style={heroStyles.varietyHint}>
          Level {levelInfo.nextLevel} needs {levelInfo.nextLevelDiversityRequired} categories with {100}+ pts
          {' '}({levelInfo.qualifyingCategories}/{levelInfo.nextLevelDiversityRequired} met)
        </Text>
      )}

      {/* Cap banner */}
      {levelInfo.isCapped && (
        <View style={heroStyles.capBanner}>
          <Ionicons name="information-circle-outline" size={16} color="#92400e" />
          <Text style={heroStyles.capText}>{levelInfo.capReason}</Text>
        </View>
      )}
    </View>
  );
};

const heroStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.black,
    borderRadius: 16,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  levelBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xl,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
    lineHeight: 36,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  rightInfo: {
    flex: 1,
  },
  gradePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  totalPts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 2,
  },
  nextLevelHint: {
    fontSize: 13,
    color: '#aaa',
  },
  maxLevelText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  barTrack: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  varietyHint: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
  },
  capBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  capText: {
    flex: 1,
    fontSize: 12,
    color: '#92400e',
    lineHeight: 17,
  },
});

// ─── Category chips row ───────────────────────────────────────────────────────

interface CategoryRowProps {
  pointsByCategory: Record<ScoreboardCategory, number>;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ pointsByCategory }) => (
  <View style={catStyles.row}>
    {ALL_CATEGORIES.map((cat) => {
      const pts = pointsByCategory[cat] ?? 0;
      const qualified = pts >= 100;
      return (
        <View key={cat} style={[catStyles.chip, qualified && { borderColor: CATEGORY_COLOR[cat] }]}>
          <Ionicons
            name={CATEGORY_ICON[cat]}
            size={16}
            color={qualified ? CATEGORY_COLOR[cat] : COLORS.muted}
          />
          <Text style={[catStyles.chipLabel, qualified && { color: CATEGORY_COLOR[cat] }]}>
            {CATEGORY_LABEL[cat]}
          </Text>
          <Text style={[catStyles.chipPts, qualified && { color: CATEGORY_COLOR[cat] }]}>
            {pts} pts
          </Text>
        </View>
      );
    })}
  </View>
);

const catStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  chip: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    alignItems: 'center',
    gap: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  chipLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipPts: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.muted,
  },
});

// ─── Badges row ───────────────────────────────────────────────────────────────

interface BadgesRowProps {
  badges: ScoreboardProgress['badges'];
}

const BadgesRow: React.FC<BadgesRowProps> = ({ badges }) => (
  <View style={badgeStyles.section}>
    <Text style={badgeStyles.title}>Badges</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={badgeStyles.scroll}>
      {badges.map((badge) => (
        <View key={badge.year} style={[badgeStyles.card, badge.earned && badgeStyles.cardEarned]}>
          <Ionicons
            name={badge.earned ? 'trophy' : 'trophy-outline'}
            size={28}
            color={badge.earned ? COLORS.primary : COLORS.border}
          />
          <Text style={[badgeStyles.label, badge.earned && badgeStyles.labelEarned]}>
            {badge.label}
          </Text>
          <Text style={badgeStyles.progress}>
            {badge.completedForYear}/{badge.totalForYear} tasks
          </Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const badgeStyles = StyleSheet.create({
  section: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  scroll: {
    gap: SPACING.sm,
    paddingRight: SPACING.lg,
  },
  card: {
    width: 110,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardEarned: {
    borderColor: COLORS.primary,
    backgroundColor: '#fffbeb',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.muted,
    textAlign: 'center',
  },
  labelEarned: {
    color: COLORS.text,
  },
  progress: {
    fontSize: 10,
    color: COLORS.muted,
  },
});

// ─── Task card ────────────────────────────────────────────────────────────────

interface TaskCardProps {
  task: ScoreboardTask;
  completing: boolean;
  onComplete: (task: ScoreboardTask) => void;
  undoing: boolean;
  onUndo: (task: ScoreboardTask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, completing, onComplete, undoing, onUndo }) => {
  const color = CATEGORY_COLOR[task.category];
  const isRepeatable = task.maxCompletions === null;
  const atLimit =
    task.maxCompletions !== null && task.completionCount >= task.maxCompletions;

  const buttonLabel = task.isCompleted
    ? isRepeatable
      ? 'Do Again'
      : null
    : 'Mark Complete';

  return (
    <View style={taskStyles.card}>
      {/* Left color bar */}
      <View style={[taskStyles.colorBar, { backgroundColor: color }]} />

      {/* Content */}
      <View style={taskStyles.content}>
        <View style={taskStyles.titleRow}>
          <Text style={taskStyles.title} numberOfLines={2}>{task.title}</Text>
          {task.isCompleted && (
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} style={taskStyles.checkIcon} />
          )}
        </View>

        {task.description ? (
          <Text style={taskStyles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}

        <View style={taskStyles.metaRow}>
          <View style={[taskStyles.categoryPill, { backgroundColor: color + '20' }]}>
            <Text style={[taskStyles.categoryText, { color }]}>
              {CATEGORY_LABEL[task.category]}
            </Text>
          </View>
          <Text style={taskStyles.pts}>+{task.points} pts</Text>
          {isRepeatable && (
            <View style={taskStyles.repeatBadge}>
              <Ionicons name="refresh-outline" size={10} color={COLORS.muted} />
              <Text style={taskStyles.repeatText}>
                {task.completionCount > 0 ? `×${task.completionCount}` : 'Repeatable'}
              </Text>
            </View>
          )}
        </View>

        {task.latestCompletion && (
          <Text style={taskStyles.completedDate}>
            Last completed {new Date(task.latestCompletion.completedAt).toLocaleDateString()}
            {task.latestCompletion.cappedAtStanding ? ' (0 pts — cap)' : ''}
          </Text>
        )}

        {buttonLabel && !atLimit && (
          <TouchableOpacity
            style={[taskStyles.button, completing && taskStyles.buttonDisabled]}
            onPress={() => onComplete(task)}
            disabled={completing}
          >
            {completing ? (
              <ActivityIndicator size="small" color={COLORS.black} />
            ) : (
              <Text style={taskStyles.buttonText}>{buttonLabel}</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Undo Last — for repeatable tasks that have at least one completion */}
        {isRepeatable && task.completionCount > 0 && (
          <TouchableOpacity
            style={[taskStyles.undoButton, undoing && taskStyles.buttonDisabled]}
            onPress={() => onUndo(task)}
            disabled={undoing}
          >
            {undoing
              ? <ActivityIndicator size="small" color={COLORS.muted} />
              : <Text style={taskStyles.undoText}>Undo Last</Text>}
          </TouchableOpacity>
        )}

        {/* Undo — for one-time tasks that are completed */}
        {atLimit && !isRepeatable && task.isCompleted && (
          <TouchableOpacity
            style={[taskStyles.undoButton, undoing && taskStyles.buttonDisabled]}
            onPress={() => onUndo(task)}
            disabled={undoing}
          >
            {undoing
              ? <ActivityIndicator size="small" color={COLORS.muted} />
              : <Text style={taskStyles.undoText}>Undo</Text>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const taskStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
  },
  checkIcon: {
    marginLeft: SPACING.xs,
    marginTop: 1,
  },
  description: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 17,
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  categoryPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pts: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  repeatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  repeatText: {
    fontSize: 10,
    color: COLORS.muted,
  },
  completedDate: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: SPACING.xs,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    marginTop: SPACING.sm,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
  },
  doneText: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  undoButton: {
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  undoText: {
    fontSize: 11,
    color: COLORS.muted,
    textDecorationLine: 'underline',
  },
});

// ─── Year accordion section ───────────────────────────────────────────────────

interface YearSectionProps {
  year: number;
  tasks: ScoreboardTask[];
  badge?: ScoreboardProgress['badges'][number];
  expanded: boolean;
  onToggle: () => void;
  completingTaskId: string | null;
  onComplete: (task: ScoreboardTask) => void;
  undoingTaskId: string | null;
  onUndo: (task: ScoreboardTask) => void;
}

const YearSection: React.FC<YearSectionProps> = ({
  year,
  tasks,
  badge,
  expanded,
  onToggle,
  completingTaskId,
  onComplete,
  undoingTaskId,
  onUndo,
}) => {
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <View style={yearStyles.section}>
      <TouchableOpacity style={yearStyles.header} onPress={onToggle} activeOpacity={0.7}>
        <View style={yearStyles.headerLeft}>
          <Text style={yearStyles.yearLabel}>
            {YEAR_LABELS[year as 1 | 2 | 3 | 4] ?? `Year ${year}`}
          </Text>
          {badge?.earned && (
            <Ionicons name="trophy" size={14} color={COLORS.primary} style={{ marginLeft: 6 }} />
          )}
        </View>
        <View style={yearStyles.headerRight}>
          <View style={yearStyles.countBadge}>
            <Text style={yearStyles.countText}>{completedCount}/{tasks.length}</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={COLORS.muted}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={yearStyles.taskList}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              completing={completingTaskId === task._id}
              onComplete={onComplete}
              undoing={undoingTaskId === task._id}
              onUndo={onUndo}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const yearStyles = StyleSheet.create({
  section: {
    marginBottom: SPACING.sm,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  countBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  taskList: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
});

// ─── Locked tier teaser ───────────────────────────────────────────────────────

const LockedTierTeaser: React.FC<{ tier: TierStatus }> = ({ tier }) => (
  <View style={lockedStyles.container}>
    <Ionicons name="lock-closed" size={20} color={COLORS.muted} />
    <View style={lockedStyles.textBlock}>
      <Text style={lockedStyles.title}>
        {YEAR_LABELS[tier.year] ?? `Year ${tier.year}`}
      </Text>
      <Text style={lockedStyles.hint}>Reach Level {tier.requiredLevel} to unlock</Text>
    </View>
  </View>
);

const lockedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    opacity: 0.65,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.muted,
  },
  hint: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export const ScoreboardScreen: React.FC = () => {
  const [progress, setProgress] = useState<ScoreboardProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([1]));
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [undoingTaskId, setUndoingTaskId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Event picker modal state
  const [eventPickerVisible, setEventPickerVisible] = useState(false);
  const [eventPickerTask, setEventPickerTask] = useState<ScoreboardTask | null>(null);
  const [eligibleEvents, setEligibleEvents] = useState<EligibleEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setToast({ message, type });
    toastTimeout.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const loadProgress = useCallback(async () => {
    setLoadError(null);
    const result = await scoreboardService.getMyProgress();
    if (result.success && result.progress) {
      setProgress(result.progress);
    } else {
      setLoadError(result.error ?? 'Failed to load scoreboard');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProgress().finally(() => setLoading(false));
    }, [loadProgress])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProgress();
    setRefreshing(false);
  }, [loadProgress]);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  const handleUndo = useCallback(async (task: ScoreboardTask) => {
    if (undoingTaskId) return;
    setUndoingTaskId(task._id);
    const result = await scoreboardService.undoTask(task._id);
    setUndoingTaskId(null);
    if (result.success) {
      showToast(`"${task.title}" marked incomplete.`, 'info');
      await loadProgress();
    } else {
      showToast(result.error ?? 'Could not undo completion', 'error');
    }
  }, [undoingTaskId, loadProgress, showToast]);

  const openEventPicker = useCallback(async (task: ScoreboardTask) => {
    setEventPickerTask(task);
    setEventPickerVisible(true);
    setLoadingEvents(true);
    const result = await scoreboardService.getEligibleEvents(task._id);
    if (result.success && result.events) {
      setEligibleEvents(result.events);
    } else {
      setEligibleEvents([]);
    }
    setLoadingEvents(false);
  }, []);

  const completeWithEvent = useCallback(async (task: ScoreboardTask, eventId: string) => {
    setEventPickerVisible(false);
    setCompletingTaskId(task._id);

    const result = await scoreboardService.completeTask(task._id, eventId);
    setCompletingTaskId(null);

    if (result.success && result.data) {
      const { pointsAwarded, cappedAtStanding, capReason } = result.data.completion;
      if (cappedAtStanding) {
        showToast(capReason || 'Standing cap reached — task recorded with 0 pts.', 'info');
      } else {
        showToast(`+${pointsAwarded} pts — "${task.title}" complete!`, 'success');
      }
      await loadProgress();
    } else {
      showToast(result.error ?? 'Could not complete task', 'error');
    }
  }, [loadProgress, showToast]);

  const handleComplete = useCallback(async (task: ScoreboardTask) => {
    if (completingTaskId) return; // prevent double-tap

    // If the task requires event attendance, open the picker instead
    if (task.requiresEvent) {
      openEventPicker(task);
      return;
    }

    setCompletingTaskId(task._id);

    const result = await scoreboardService.completeTask(task._id);
    setCompletingTaskId(null);

    if (result.success && result.data) {
      const { pointsAwarded, cappedAtStanding, capReason } = result.data.completion;
      if (cappedAtStanding) {
        showToast(capReason || 'Standing cap reached — task recorded with 0 pts.', 'info');
      } else {
        showToast(`+${pointsAwarded} pts — "${task.title}" complete!`, 'success');
      }
      await loadProgress();
    } else {
      showToast(result.error ?? 'Could not complete task', 'error');
    }
  }, [completingTaskId, loadProgress, showToast, openEventPicker]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 60 }} />
      </SafeAreaView>
    );
  }

  if (!progress) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="trophy-outline" size={48} color={COLORS.border} />
          <Text style={styles.errorText}>Could not load scoreboard.</Text>
          {loadError ? (
            <Text style={styles.errorDetail}>{loadError}</Text>
          ) : null}
          <Text style={styles.errorDetail}>API: {API_URL}</Text>
          <Text style={styles.errorSub}>
            Make sure the backend is running{'\n'}and the database is seeded.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => { setLoading(true); loadProgress().finally(() => setLoading(false)); }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Toast notification */}
      {toast && (
        <View style={[
          styles.toast,
          toast.type === 'success' && styles.toastSuccess,
          toast.type === 'error' && styles.toastError,
          toast.type === 'info' && styles.toastInfo,
        ]}>
          <Ionicons
            name={toast.type === 'success' ? 'checkmark-circle' : toast.type === 'error' ? 'close-circle' : 'information-circle'}
            size={18}
            color="#fff"
          />
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Header */}
        <Text style={styles.screenTitle}>Flight Scoreboard</Text>

        {/* Level hero card */}
        <LevelHero progress={progress} />

        {/* Category breakdown */}
        <Text style={styles.sectionTitle}>Category Progress</Text>
        <CategoryRow pointsByCategory={progress.levelInfo.pointsByCategory} />

        {/* Badges */}
        <BadgesRow badges={progress.badges} />

        {/* Year accordion */}
        <Text style={styles.sectionTitle}>Milestone Tasks</Text>
        {(progress.tierStatus ?? []).map((tier) => {
          if (!tier.unlocked) {
            return <LockedTierTeaser key={tier.year} tier={tier} />;
          }
          const badge = progress.badges.find((b) => b.year === tier.year);
          return (
            <YearSection
              key={tier.year}
              year={tier.year}
              tasks={progress.tasksByYear[String(tier.year)] ?? []}
              badge={badge}
              expanded={expandedYears.has(tier.year)}
              onToggle={() => toggleYear(tier.year)}
              completingTaskId={completingTaskId}
              onComplete={handleComplete}
              undoingTaskId={undoingTaskId}
              onUndo={handleUndo}
            />
          );
        })}

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Event picker modal */}
      <Modal
        visible={eventPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEventPickerVisible(false)}
      >
        <View style={pickerStyles.overlay}>
          <View style={pickerStyles.sheet}>
            <View style={pickerStyles.header}>
              <Text style={pickerStyles.title}>Select an Event</Text>
              <TouchableOpacity onPress={() => setEventPickerVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {eventPickerTask && (
              <Text style={pickerStyles.taskHint}>
                For: {eventPickerTask.title}
              </Text>
            )}

            {loadingEvents ? (
              <View style={pickerStyles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={pickerStyles.loadingText}>Loading events...</Text>
              </View>
            ) : eligibleEvents.length === 0 ? (
              <View style={pickerStyles.center}>
                <Ionicons name="calendar-outline" size={48} color={COLORS.border} />
                <Text style={pickerStyles.emptyTitle}>No Eligible Events</Text>
                <Text style={pickerStyles.emptyMessage}>
                  You haven't RSVP'd to any matching events yet.{'\n'}Check the Resources tab for upcoming events.
                </Text>
              </View>
            ) : (
              <FlatList
                data={eligibleEvents}
                keyExtractor={(item) => item._id}
                contentContainerStyle={pickerStyles.list}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={pickerStyles.eventCard}
                    onPress={() => eventPickerTask && completeWithEvent(eventPickerTask, item._id)}
                    activeOpacity={0.7}
                  >
                    <View style={pickerStyles.eventInfo}>
                      <Text style={pickerStyles.eventTitle}>{item.title}</Text>
                      <View style={pickerStyles.eventMeta}>
                        <Ionicons name="calendar-outline" size={14} color={COLORS.muted} />
                        <Text style={pickerStyles.eventDate}>{item.date}</Text>
                      </View>
                      {item.location && (
                        <View style={pickerStyles.eventMeta}>
                          <Ionicons name="location-outline" size={14} color={COLORS.muted} />
                          <Text style={pickerStyles.eventDate}>{item.location}</Text>
                        </View>
                      )}
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  errorDetail: {
    textAlign: 'center',
    color: '#dc2626',
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#fef2f2',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    marginHorizontal: SPACING.sm,
  },
  errorSub: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
  },
  retryText: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 14,
  },
  bottomPad: {
    height: SPACING.xxxl,
  },
  toast: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.xl,
    right: SPACING.xl,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  toastSuccess: {
    backgroundColor: '#16a34a',
  },
  toastError: {
    backgroundColor: '#dc2626',
  },
  toastInfo: {
    backgroundColor: '#d97706',
  },
  toastText: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
});

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  taskHint: {
    fontSize: 13,
    color: COLORS.muted,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  loadingText: {
    color: COLORS.muted,
    marginTop: SPACING.sm,
    fontSize: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptyMessage: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  list: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  eventDate: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
