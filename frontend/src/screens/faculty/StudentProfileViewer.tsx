// src/screens/faculty/StudentProfileViewer.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import authService from '../../services/authService';

type Student = {
  id: string;
  name: string;
  cin: string;
  email: string;
  gradeLevel?: string;
  major?: string;
  degreeType?: string;
  gpa?: number;
  credits?: number;
  careerInterests?: string[];
  financialStatus?: string;
  commuteStatus?: string;
  linkedIn?: string;
  osd?: string[];
};
 
const StudentProfileViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [scoreboard, setScoreboard] = useState<any>(null);


  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery.trim());
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      console.log('Searching for students:', query);
      const result = await authService.searchStudents(query);
      console.log('Search result:', result);
      
      if (result.success && result.students) {
        // Map MongoDB _id to id for each student
        const mappedStudents = result.students.map((student: any) => ({
          ...student,
          id: student._id || student.id,
        }));
        console.log('Mapped students:', mappedStudents);
        setSearchResults(mappedStudents);
      } else {
        console.error('Search failed:', result.error);
        Alert.alert('Error', result.error || 'Failed to search students');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search students: ' + (error instanceof Error ? error.message : String(error)));
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const viewStudentDetails = async (student: Student) => {
  setSelectedStudent(student);
  setDetailsLoading(true);
  setModalVisible(true);

  try {
    console.log('Fetching details for student:', student.id);

    const [profileResult, scoreboardResult] = await Promise.all([
      authService.getStudentDetails(student.id),
      authService.getStudentScoreboard(student.id),
    ]);

    console.log('Student details result:', profileResult);

    if (profileResult.success && profileResult.student) {
      const studentData = {
        ...profileResult.student,
        id: profileResult.student._id || profileResult.student.id,
      };
      setStudentDetails(studentData);
    } else {
      Alert.alert('Error', profileResult.error || 'Failed to load student details');
    }

    if (scoreboardResult && scoreboardResult.levelInfo) {
      setScoreboard(scoreboardResult);
    }

  } catch (error) {
    console.error('Error fetching student details:', error);
    Alert.alert(
      'Error',
      'Failed to load student details: ' +
        (error instanceof Error ? error.message : String(error))
    );
  } finally {
    setDetailsLoading(false);
  }
};


  const renderSearchResult = ({ item }: { item: Student }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => viewStudentDetails(item)}
      activeOpacity={0.7}
    >
      <View style={styles.resultCardContent}>
        <View style={styles.resultHeader}>
          <View style={styles.studentInitial}>
            <Text style={styles.initialText}>
              {item.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.resultTextContainer}>
            <Text style={styles.resultName} numberOfLines={1}>{item.name || 'Unknown'}</Text>
            <Text style={styles.resultEmail} numberOfLines={1}>{item.email || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.resultFooter}>
          <View style={styles.cinBadge}>
            <Text style={styles.cinText}>CIN: {item.cin || 'N/A'}</Text>
          </View>
          {item.major && (
            <Text style={styles.resultMajor} numberOfLines={1}>{item.major}</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
    </TouchableOpacity>
  );

  const renderStudentDetail = (label: string, value: any, icon?: string) => {
    if (!value) return null;
    return (
      <View style={styles.detailRow}>
        <View style={styles.detailLabelContainer}>
          {icon && <Ionicons name={icon as any} size={18} color={COLORS.primary} style={styles.detailIcon} />}
          <Text style={styles.detailLabel}>{label}</Text>
        </View>
        <Text style={styles.detailValue}>
          {Array.isArray(value) ? value.join(', ') : value.toString()}
        </Text>
      </View>
    );
  };

  const [expandedTiers, setExpandedTiers] = useState<Record<number, boolean>>({
    1: true, 2: false, 3: false, 4: false,
  });

  const toggleTier = (year: number) => {
    setExpandedTiers(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const TIER_LABELS: Record<number, string> = {
    1: 'Baby Eagle', 2: 'Fledgling Eagle', 3: 'Soaring Eagle', 4: 'Golden Eagle',
  };

  const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    ACADEMIC_PROGRESS:    { label: 'Academic',  color: COLORS.secondary, icon: 'school-outline'   },
    CAREER_PREP:          { label: 'Career',    color: '#ca8a04',        icon: 'briefcase-outline' },
    COMMUNITY_LEADERSHIP: { label: 'Community', color: '#16a34a',        icon: 'people-outline'   },
  };

  const renderScoreboard = () => {
    if (!scoreboard || !scoreboard.levelInfo) return null;
    const { levelInfo, badges, tasksByYear, tierStatus, summary } = scoreboard;
    const highestUnlocked = [...(tierStatus || [])].reverse().find((t: any) => t.unlocked);
    const tierLabel = highestUnlocked ? TIER_LABELS[highestUnlocked.year] : 'Baby Eagle';
    const completionPct = summary.totalTasksAvailable > 0
      ? Math.round((summary.totalTasksCompleted / summary.totalTasksAvailable) * 100)
      : 0;

    return (
      <View>
        {/* Section header */}
        <View style={styles.sbHeader}>
          <Ionicons name="trophy" size={20} color={COLORS.primary} />
          <Text style={styles.sbHeaderTitle}>Scoreboard Progress</Text>
        </View>

        {/* Level card */}
        <View style={styles.levelCard}>
          <View style={styles.levelLeft}>
            <Text style={styles.levelNumber}>Level {levelInfo.currentLevel}</Text>
            <View style={styles.tierPill}>
              <Text style={styles.tierPillText}>{tierLabel}</Text>
            </View>
          </View>
          <View style={styles.levelRight}>
            <Text style={styles.totalPts}>{levelInfo.totalPoints.toLocaleString()} pts</Text>
            <View style={styles.levelTrack}>
              <View style={[styles.levelFill, { width: `${levelInfo.progressPercent}%` as any }]} />
            </View>
            {!levelInfo.isMaxLevel ? (
              <Text style={styles.nextLevelHint}>
                {levelInfo.pointsToNextLevel?.toLocaleString()} pts to Level {levelInfo.nextLevel}
              </Text>
            ) : (
              <Text style={styles.maxLevelHint}>Max Level Reached!</Text>
            )}
          </View>
        </View>

        {/* Quick stats row */}
        <View style={styles.statsRow}>
          {[
            { value: summary.totalTasksCompleted, label: 'Completed' },
            { value: summary.totalTasksAvailable, label: 'Total Tasks' },
            { value: `${completionPct}%`,          label: 'Progress'  },
          ].map((s, i) => (
            <View key={i} style={styles.statBox}>
              <Text style={styles.statBoxValue}>{s.value}</Text>
              <Text style={styles.statBoxLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Category breakdown */}
        <View style={styles.categoryCard}>
          <Text style={styles.categoryCardTitle}>Points by Category</Text>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const pts = (levelInfo.pointsByCategory as any)[key] || 0;
            const pct = levelInfo.totalPoints > 0
              ? Math.round((pts / levelInfo.totalPoints) * 100)
              : 0;
            return (
              <View key={key} style={styles.catRow}>
                <View style={styles.catLeft}>
                  <Ionicons name={cfg.icon as any} size={15} color={cfg.color} />
                  <Text style={styles.catLabel}>{cfg.label}</Text>
                </View>
                <View style={styles.catTrack}>
                  <View style={[styles.catFill, { width: `${pct}%` as any, backgroundColor: cfg.color }]} />
                </View>
                <Text style={[styles.catPts, { color: cfg.color }]}>{pts} pts</Text>
              </View>
            );
          })}
        </View>

        {/* Eagle tier badges 2×2 grid */}
        <View style={styles.tiersGrid}>
          {(badges as any[]).map((badge: any) => {
            const tier = (tierStatus as any[]).find((t: any) => t.year === badge.year);
            const locked = !tier?.unlocked;
            return (
              <View key={badge.year} style={[styles.tierBadgeCard, locked && styles.tierBadgeCardLocked]}>
                <Ionicons
                  name={badge.earned ? 'trophy' : locked ? 'lock-closed-outline' : 'trophy-outline'}
                  size={22}
                  color={badge.earned ? COLORS.primary : locked ? COLORS.muted : COLORS.text}
                />
                <Text style={[styles.tierBadgeName, locked && styles.tierBadgeNameLocked]}>
                  {badge.label}
                </Text>
                {locked ? (
                  <Text style={styles.tierBadgeLock}>Requires Level {tier?.requiredLevel}</Text>
                ) : (
                  <Text style={[styles.tierBadgeCount, badge.earned && { color: '#16a34a' }]}>
                    {badge.completedForYear}/{badge.totalForYear} tasks
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Task accordion by tier */}
        <Text style={styles.tasksAccordionTitle}>Tasks by Tier</Text>
        {Object.entries(tasksByYear as Record<string, any[]>)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([year, tasks]) => {
            const yr = Number(year);
            const tierLocked = !(tierStatus as any[]).find((t: any) => t.year === yr)?.unlocked;
            const doneCount = tasks.filter((t: any) => t.isCompleted).length;
            const isOpen = expandedTiers[yr];
            return (
              <View key={year} style={styles.tierSection}>
                <TouchableOpacity style={styles.tierSectionHeader} onPress={() => toggleTier(yr)}>
                  <View style={styles.tierSectionLeft}>
                    <Text style={styles.tierSectionTitle}>{TIER_LABELS[yr]}</Text>
                    <View style={[styles.tierCountPill, tierLocked && styles.tierCountPillLocked]}>
                      <Text style={[styles.tierCountText, tierLocked && styles.tierCountTextLocked]}>
                        {tierLocked ? `🔒 Level ${(tierStatus as any[]).find((t:any) => t.year === yr)?.requiredLevel}` : `${doneCount}/${tasks.length}`}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.muted} />
                </TouchableOpacity>

                {isOpen && tasks.map((task: any) => {
                  const cfg = CATEGORY_CONFIG[task.category];
                  return (
                    <View key={task._id} style={[styles.taskRow, task.isCompleted && styles.taskRowDone]}>
                      <Ionicons
                        name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                        size={18}
                        color={task.isCompleted ? '#16a34a' : COLORS.muted}
                        style={{ flexShrink: 0 }}
                      />
                      <View style={styles.taskInfo}>
                        <Text style={[styles.taskTitle, task.isCompleted && styles.taskTitleDone]}>
                          {task.title}
                        </Text>
                        {task.latestCompletion ? (
                          <Text style={styles.taskMeta}>
                            +{task.latestCompletion.pointsAwarded} pts ·{' '}
                            {new Date(task.latestCompletion.completedAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </Text>
                        ) : (
                          <Text style={styles.taskMetaMuted}>{task.points} pts available</Text>
                        )}
                      </View>
                      {cfg && <View style={[styles.catDot, { backgroundColor: cfg.color }]} />}
                    </View>
                  );
                })}
              </View>
            );
          })}

        <View style={{ height: SPACING.xxxl }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Students</Text>
        <Text style={styles.headerSubtitle}>Find and view student profiles</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or CIN..."
            placeholderTextColor={COLORS.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={20} color={COLORS.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchResults.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            <Ionicons name="people" size={16} color={COLORS.primary} /> Found {searchResults.length} student{searchResults.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderSearchResult}
        style={styles.resultsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          searchQuery.length >= 2 && !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color={COLORS.muted} />
              <Text style={styles.noResults}>No students found</Text>
              <Text style={styles.noResultsSubtext}>Try a different name or CIN</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="information-circle-outline" size={48} color={COLORS.muted} />
              <Text style={styles.noResults}>Enter a search query</Text>
              <Text style={styles.noResultsSubtext}>Search by student name or CIN number</Text>
            </View>
          )
        }
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={false}
  onRequestClose={() => setModalVisible(false)}
>
  <SafeAreaView style={styles.modalContainer}>
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Ionicons name="chevron-back" size={28} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.modalHeaderTitle}>Student Profile</Text>
      <View style={styles.spacer} />
    </View>

    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
      {detailsLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : studentDetails ? (
        <View>
          {/* ─── PROFILE HEADER ─── */}
          <View style={styles.profileHeader}>
            <View style={styles.profileInitial}>
              <Text style={styles.profileInitialText}>
                {studentDetails.name?.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>
            <Text style={styles.profileName}>{studentDetails.name || 'N/A'}</Text>
            <Text style={styles.profileEmail}>{studentDetails.email || 'N/A'}</Text>
          </View>

          {/* ─── STUDENT DETAILS ─── */}
          <View style={styles.detailsCard}>
            {renderStudentDetail('CIN', studentDetails.cin, 'card')}
            {renderStudentDetail('Grade Level', studentDetails.gradeLevel, 'school')}
            {renderStudentDetail('Major', studentDetails.major, 'book')}
            {renderStudentDetail('Degree Type', studentDetails.degreeType, 'star')}
            {renderStudentDetail('GPA', studentDetails.gpa, 'trending-up')}
            {renderStudentDetail('Credits', studentDetails.credits, 'checkmark-circle')}
            {renderStudentDetail('Career Interests', studentDetails.careerInterests, 'briefcase')}
            {renderStudentDetail('Financial Status', studentDetails.financialStatus, 'wallet')}
            {renderStudentDetail('Commute Status', studentDetails.commuteStatus, 'car')}
            {renderStudentDetail('LinkedIn', studentDetails.linkedIn, 'logo-linkedin')}
            {studentDetails.osd && renderStudentDetail('OSD Information', studentDetails.osd, 'shield-checkmark')}
          </View>

            {renderScoreboard()}
  </View>
      ) : (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={COLORS.secondary} />
          <Text style={styles.errorText}>Failed to load student details</Text>
        </View>
      )}
    </ScrollView>
  </SafeAreaView>
</Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
  searchSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  resultsHeader: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  resultsCount: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  resultsList: {
    flex: 1,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  resultCardContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  studentInitial: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  initialText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  resultEmail: {
    fontSize: 13,
    color: COLORS.muted,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cinBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cinText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  resultMajor: {
    fontSize: 12,
    color: COLORS.muted,
    maxWidth: 120,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResults: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  noResultsSubtext: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: SPACING.sm,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  closeButton: {
    padding: SPACING.xs,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  spacer: {
    width: 28,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  profileInitial: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileInitialText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: 13,
    color: COLORS.muted,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  detailRow: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailIcon: {
    marginRight: SPACING.sm,
    width: 18,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
    marginTop: 4,
    marginLeft: 26,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: SPACING.md,
    fontWeight: '600',
  },
  // ── Scoreboard section ────────────────────────────────────────────────────
  sbHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  sbHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  // Level card
  levelCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: 'center',
    gap: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  levelLeft: {
    alignItems: 'center',
    minWidth: 80,
  },
  levelNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  tierPill: {
    marginTop: 4,
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tierPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.text,
  },
  levelRight: {
    flex: 1,
    gap: SPACING.xs,
  },
  totalPts: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  levelTrack: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  nextLevelHint: {
    fontSize: 12,
    color: COLORS.muted,
  },
  maxLevelHint: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  statBoxLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  // Category card
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: SPACING.md,
  },
  categoryCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: 90,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  catTrack: {
    flex: 1,
    height: 7,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  catFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 4,
  },
  catPts: {
    fontSize: 13,
    fontWeight: '700',
    width: 60,
    textAlign: 'right',
  },

  // Tier badge grid
  tiersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tierBadgeCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  tierBadgeCardLocked: {
    backgroundColor: '#F8F8F8',
    borderColor: '#EBEBEB',
  },
  tierBadgeName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  tierBadgeNameLocked: {
    color: COLORS.muted,
  },
  tierBadgeCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
  },
  tierBadgeLock: {
    fontSize: 11,
    color: COLORS.muted,
    fontStyle: 'italic',
  },

  // Task accordion
  tasksAccordionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  tierSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  tierSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  tierSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  tierSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  tierCountPill: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tierCountPillLocked: {
    backgroundColor: '#F0F0F0',
  },
  tierCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  tierCountTextLocked: {
    color: COLORS.muted,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
    gap: SPACING.sm,
  },
  taskRowDone: {
    backgroundColor: '#F9FFF9',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.muted,
  },
  taskTitleDone: {
    color: COLORS.text,
    fontWeight: '600',
  },
  taskMeta: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 2,
    fontWeight: '600',
  },
  taskMetaMuted: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    flexShrink: 0,
  },
});

export default StudentProfileViewer;