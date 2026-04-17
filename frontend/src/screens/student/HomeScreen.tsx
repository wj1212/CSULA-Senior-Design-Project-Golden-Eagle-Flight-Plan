import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from '../../components/StatCard';
import { mockUser } from '../../data/mockData';
import { CircleButton } from '../../components/CircleButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import scoreboardService from '../../services/scoreboardService';
import * as resourceService from '../../services/resourceService';
import { ScoreboardProgress } from '../../types';

export const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { user, loading } = useAuth();
  const navigation = useNavigation<any>();

  const [scoreProgress, setScoreProgress] = useState<ScoreboardProgress | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<resourceService.Event[]>([]);

  useFocusEffect(
    useCallback(() => {
      scoreboardService.getMyProgress().then((result) => {
        if (result.success && result.progress) setScoreProgress(result.progress);
      });
      resourceService.getEvents().then((result) => {
        if (result.success) setUpcomingEvents((result.events ?? []).slice(0, 2));
      });
    }, [])
  );

  // Quick action navigation
  const handleScoreboardPress  = () => navigation.navigate('Plan');
  const handleBrowseEventsPress = () => navigation.navigate('Resources');
  const handleAIPress = () => navigation.navigate('Courses');

  // Circle press handlers (navigate to Scoreboard for now)
  const handleAcademicPress   = () => navigation.navigate('Plan');
  const handleCareerPress     = () => navigation.navigate('Plan');
  const handleLeadershipPress = () => navigation.navigate('Plan');

  // Per-category scoreboard stats
  const getCategoryStats = (cat: string) => {
    if (!scoreProgress) return { points: undefined, percent: undefined };
    const points = (scoreProgress.levelInfo.pointsByCategory as Record<string, number>)[cat] ?? 0;
    const allTasks = Object.values(scoreProgress.tasksByYear).flat();
    const catTasks = allTasks.filter((t) => t.category === cat);
    const completed = catTasks.filter((t) => t.completionCount > 0).length;
    const percent = catTasks.length > 0 ? Math.round((completed / catTasks.length) * 100) : 0;
    return { points, percent };
  };
  const academic  = getCategoryStats('ACADEMIC_PROGRESS');
  const career    = getCategoryStats('CAREER_PREP');
  const community = getCategoryStats('COMMUNITY_LEADERSHIP');

  // Circle button sizing
  const sidePadding = SPACING.xl * 2;
  const spacingBetweenCircles = SPACING.lg * 2;
  const dynamicSize = (width - sidePadding - spacingBetweenCircles) / 3;
  const circleSize = Math.min(dynamicSize, 300);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const displayUser = user ?? mockUser;
  const academicLevel = scoreProgress?.student?.gradeLevel ?? '—';

  const categoryLabel = (cat: string) =>
    cat === 'ACADEMIC_PROGRESS' ? 'Academic'
      : cat === 'CAREER_PREP' ? 'Career' : 'Community';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={110}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Welcome back, {displayUser?.name?.split(' ')[0] ?? 'Student'}!
            </Text>

            {/* Category progress circles */}
            <View style={styles.circleNavContainer}>
              <CircleButton
                title="Academic"
                onPress={handleAcademicPress}
                size={circleSize}
                points={academic.points}
                percent={academic.percent}
                color="#552583"
                icon="school-outline"
              />
              <CircleButton
                title="Career"
                onPress={handleCareerPress}
                size={circleSize}
                points={career.points}
                percent={career.percent}
                color="#ca8a04"
                icon="briefcase-outline"
              />
              <CircleButton
                title="Community"
                onPress={handleLeadershipPress}
                size={circleSize}
                points={community.points}
                percent={community.percent}
                color="#16a34a"
                icon="people-outline"
              />
            </View>

            {/* Stats row */}
            <View style={styles.statsContainer}>
              <StatCard value={displayUser.gpa ?? mockUser.gpa} label="Current GPA" />
              <StatCard value={displayUser.credits ?? mockUser.credits} label="Credits Earned" />
              <StatCard value={academicLevel} label="Academic Level" />
            </View>

            {/* Upcoming Events */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              {upcomingEvents.length === 0 ? (
                <View style={styles.emptyEvents}>
                  <Ionicons name="calendar-outline" size={36} color={COLORS.muted} />
                  <Text style={styles.emptyEventsText}>No upcoming events yet</Text>
                </View>
              ) : (
                upcomingEvents.map((event) => (
                  <TouchableOpacity
                    key={event._id}
                    style={styles.eventCard}
                    onPress={() => navigation.navigate('Resources')}
                    activeOpacity={0.75}
                  >
                    <View style={styles.eventIconCol}>
                      <Ionicons name="calendar" size={22} color={COLORS.secondary} />
                    </View>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                      <Text style={styles.eventMeta}>{event.date}</Text>
                      {event.location ? (
                        <Text style={styles.eventMeta}>{event.location}</Text>
                      ) : null}
                    </View>
                    {event.scoreboardCategory ? (
                      <View style={styles.scoreboardChip}>
                        <Text style={styles.scoreboardChipText}>
                          {categoryLabel(event.scoreboardCategory)}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction} onPress={handleScoreboardPress}>
                  <Ionicons name="trophy-outline" size={26} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>My Scoreboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction} onPress={handleBrowseEventsPress}>
                  <Ionicons name="calendar-outline" size={26} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>Browse Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction} onPress={handleAIPress}>
                  <Ionicons name="sparkles-outline" size={26} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>AI Tools</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.text} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={COLORS.text}
              style={styles.searchInput}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  circleNavContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
    gap: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginHorizontal: -SPACING.sm,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Upcoming Events
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  eventIconCol: {
    marginRight: SPACING.md,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  eventMeta: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  scoreboardChip: {
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: SPACING.sm,
  },
  scoreboardChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  emptyEvents: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: SPACING.sm,
  },
  emptyEventsText: {
    fontSize: 13,
    color: COLORS.muted,
  },
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: COLORS.card,
    padding: SPACING.xl,
    borderRadius: SPACING.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SPACING.xs,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    marginTop: SPACING.sm,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  // Search bar
  searchBarContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: SPACING.sm,
    color: COLORS.text,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: SPACING.xs,
  },
});
