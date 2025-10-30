import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

export const CoursesScreen: React.FC = () => {
  const [recommendations, setRecommendations] = useState<CourseRecommendations | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<RecommendedCourse | null>(null);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'available' | 'all'>('roadmap');

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('=== Starting to load course data ===');
      console.log('Loading course recommendations...');
      
      const [recommendationsData, progressData] = await Promise.all([
        courseService.getRecommendedCourses(),
        courseService.getCourseProgress(),
      ]);
      
      console.log('=== Data received successfully ===');
      console.log('Recommendations:', JSON.stringify(recommendationsData, null, 2));
      console.log('Progress:', JSON.stringify(progressData, null, 2));
      console.log('Current semester courses:', recommendationsData.currentSemesterCourses?.length || 0);
      console.log('Next semester courses:', recommendationsData.nextSemesterCourses?.length || 0);
      console.log('Future courses:', recommendationsData.futureCourses?.length || 0);
      console.log('Total available:', recommendationsData.totalAvailable);
      
      setRecommendations(recommendationsData);
      setProgress(progressData);
      console.log('=== State updated ===');
    } catch (error) {
      console.error('=== Error loading course data ===');
      console.error('Error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert(
        'Error Loading Courses', 
        `${errorMessage}\n\n` +
        'Troubleshooting:\n' +
        '1. Make sure backend server is running (node server.js)\n' +
        '2. Check if you are logged in\n' +
        '3. Open console to see detailed error logs'
      );
      // Set empty state so we can still show UI
      setRecommendations({
        currentSemester: 1,
        currentSemesterCourses: [],
        nextSemesterCourses: [],
        futureCourses: [],
        unavailableCourses: [],
        totalAvailable: 0,
        totalUnavailable: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getPriorityColor = (course: RecommendedCourse) => {
    if (!course.prerequisitesMet) return '#ef4444';
    if (course.isRequired) return '#dc2626';
    if (course.category === 'Upper Division Core') return '#ea580c';
    return '#059669';
  };

  const getPriorityText = (course: RecommendedCourse) => {
    if (!course.prerequisitesMet) return 'Missing Prereqs';
    if (course.isRequired) return 'Required';
    if (course.category === 'Upper Division Core') return 'Core';
    return 'Elective';
  };

  const renderCourseCard = (course: RecommendedCourse) => (
    <TouchableOpacity
      key={course._id}
      style={styles.courseCard}
      onPress={() => setSelectedCourse(course)}
    >
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCode}>{course.courseCode}</Text>
          <Text style={styles.courseName} numberOfLines={2}>
            {course.courseName}
          </Text>
          <Text style={styles.courseUnits}>{course.units} units</Text>
        </View>
        <View style={[
          styles.priorityBadge,
          { backgroundColor: getPriorityColor(course) }
        ]}>
          <Text style={styles.priorityText}>
            {getPriorityText(course)}
          </Text>
        </View>
      </View>
      
      {course.prerequisites.length > 0 && (
        <View style={styles.prerequisitesContainer}>
          <Text style={styles.prerequisitesLabel}>Prerequisites:</Text>
          <Text style={[
            styles.prerequisitesText,
            { color: course.prerequisitesMet ? COLORS.text : '#ef4444' }
          ]}>
            {course.prerequisites.join(', ')}
          </Text>
        </View>
      )}
      
      <Text style={styles.reasonText}>{course.reason}</Text>
    </TouchableOpacity>
  );

  const groupCoursesBySemester = () => {
    if (!recommendations) return {};
    
    const allCourses = [
      ...(recommendations.currentSemesterCourses || []),
      ...(recommendations.nextSemesterCourses || []),
      ...(recommendations.futureCourses || [])
    ];
    
    const grouped: { [key: number]: RecommendedCourse[] } = {};
    allCourses.forEach(course => {
      if (!grouped[course.semester]) {
        grouped[course.semester] = [];
      }
      grouped[course.semester].push(course);
    });
    
    return grouped;
  };

  const renderSemesterRoadmap = () => {
    if (!recommendations) {
      return (
        <View style={styles.tabContent}>
          <View style={styles.emptyState}>
            <Ionicons name="alert-circle" size={48} color="#f59e0b" />
            <Text style={styles.emptyStateText}>
              No recommendation data available. {'\n'}
              Please check your connection and try refreshing.
            </Text>
          </View>
        </View>
      );
    }

    const semesterGroups = groupCoursesBySemester();
    const semesters = Object.keys(semesterGroups).map(Number).sort((a, b) => a - b);
    
    if (semesters.length === 0) {
      return (
        <View style={styles.tabContent}>
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color={COLORS.primary} />
            <Text style={styles.emptyStateText}>
              Complete some foundational courses in your Profile to see your personalized roadmap
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.roadmapContainer}>
        {semesters.map(semester => {
          const year = Math.ceil(semester / 2);
          const term = semester % 2 === 1 ? 'Fall' : 'Spring';
          const yearName = ['Freshman', 'Sophomore', 'Junior', 'Senior'][year - 1] || `Year ${year}`;
          const courses = semesterGroups[semester] || [];
          const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);
          
          return (
            <View key={semester} style={styles.semesterBlock}>
              <View style={styles.semesterHeader}>
                <View style={styles.semesterTitleContainer}>
                  <Text style={styles.yearLabel}>{yearName}</Text>
                  <Text style={styles.semesterTitle}>{term} Semester {semester}</Text>
                </View>
                <View style={styles.unitsContainer}>
                  <Text style={styles.unitsText}>{totalUnits} units</Text>
                </View>
              </View>
              
              <View style={styles.coursesInSemester}>
                {courses.map(course => (
                  <TouchableOpacity
                    key={course._id}
                    style={[
                      styles.semesterCourseCard,
                      !course.prerequisitesMet && styles.lockedCourse
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <View style={styles.courseCardContent}>
                      <View style={styles.courseCardLeft}>
                        <Text style={styles.semesterCourseCode}>{course.courseCode}</Text>
                        <Text style={styles.semesterCourseName} numberOfLines={2}>
                          {course.courseName}
                        </Text>
                      </View>
                      <View style={styles.courseCardRight}>
                        <Text style={styles.courseUnitsText}>{course.units}u</Text>
                        {!course.prerequisitesMet && (
                          <Ionicons name="lock-closed" size={16} color="#ef4444" />
                        )}
                        {course.prerequisitesMet && (
                          <Ionicons name="checkmark-circle" size={16} color="#059669" />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderAvailableNow = () => {
    if (!recommendations) return null;
    
    const availableCourses = [
      ...(recommendations.currentSemesterCourses || []),
      ...(recommendations.nextSemesterCourses || []),
      ...(recommendations.futureCourses || [])
    ].filter(course => course.prerequisitesMet);

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Available to Take Now ({availableCourses.length})</Text>
        {availableCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color={COLORS.primary} />
            <Text style={styles.emptyStateText}>
              Complete prerequisite courses to unlock more options
            </Text>
          </View>
        ) : (
          availableCourses.map(renderCourseCard)
        )}
      </View>
    );
  };

  const renderAllCourses = () => {
    if (!recommendations) return null;
    
    const allCourses = [
      ...(recommendations.currentSemesterCourses || []),
      ...(recommendations.nextSemesterCourses || []),
      ...(recommendations.futureCourses || [])
    ];

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>All Courses ({allCourses.length})</Text>
        {allCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color={COLORS.primary} />
            <Text style={styles.emptyStateText}>
              No courses available
            </Text>
          </View>
        ) : (
          allCourses.map(renderCourseCard)
        )}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roadmap':
        return renderSemesterRoadmap();
      case 'available':
        return renderAvailableNow();
      case 'all':
        return renderAllCourses();
      default:
        return renderSemesterRoadmap();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading course recommendations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Progress Stats */}
        {progress && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{progress.completionPercentage}%</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{progress.completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{progress.remainingCount}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{progress.completedUnits}</Text>
              <Text style={styles.statLabel}>Units</Text>
            </View>
          </View>
        )}

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'roadmap' && styles.activeTab]}
            onPress={() => setActiveTab('roadmap')}
          >
            <Ionicons 
              name="map" 
              size={18} 
              color={activeTab === 'roadmap' ? '#000' : COLORS.text} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'roadmap' && styles.activeTabText]}>
              Roadmap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'available' && styles.activeTab]}
            onPress={() => setActiveTab('available')}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={18} 
              color={activeTab === 'available' ? '#000' : COLORS.text} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
              Available
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Ionicons 
              name="list" 
              size={18} 
              color={activeTab === 'all' ? '#000' : COLORS.text} 
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Unavailable Courses (if any) */}
        {recommendations && recommendations.unavailableCourses.length > 0 && activeTab === 'all' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Courses with Missing Prerequisites</Text>
            {recommendations.unavailableCourses.slice(0, 5).map(renderCourseCard)}
          </View>
        )}
      </ScrollView>

      {/* Course Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedCourse !== null}
        onRequestClose={() => setSelectedCourse(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCourse && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedCourse.courseCode}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedCourse(null)}
                  >
                    <Ionicons name="close" size={24} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalCourseName}>{selectedCourse.courseName}</Text>
                  <Text style={styles.modalUnits}>{selectedCourse.units} units</Text>
                  
                  <Text style={styles.modalSectionTitle}>Category</Text>
                  <Text style={styles.modalText}>{selectedCourse.category}</Text>
                  
                  <Text style={styles.modalSectionTitle}>Recommended Semester</Text>
                  <Text style={styles.modalText}>
                    {courseService.getSemesterName(selectedCourse.semester)}
                  </Text>
                  
                  {selectedCourse.prerequisites.length > 0 && (
                    <>
                      <Text style={styles.modalSectionTitle}>Prerequisites</Text>
                      <Text style={[
                        styles.modalText,
                        { color: selectedCourse.prerequisitesMet ? COLORS.text : '#ef4444' }
                      ]}>
                        {selectedCourse.prerequisites.join(', ')}
                      </Text>
                    </>
                  )}
                  
                  {selectedCourse.description && (
                    <>
                      <Text style={styles.modalSectionTitle}>Description</Text>
                      <Text style={styles.modalText}>{selectedCourse.description}</Text>
                    </>
                  )}
                  
                  <Text style={styles.modalSectionTitle}>Status</Text>
                  <Text style={[
                    styles.modalText,
                    { color: selectedCourse.prerequisitesMet ? '#059669' : '#ef4444' }
                  ]}>
                    {selectedCourse.reason}
                  </Text>
                </ScrollView>
              </>
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: 'white',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  activeTabText: {
    color: '#000',
  },
  tabContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  courseCard: {
    backgroundColor: 'white',
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  courseInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  courseName: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 2,
  },
  courseUnits: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  prerequisitesContainer: {
    marginTop: SPACING.sm,
  },
  prerequisitesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  prerequisitesText: {
    fontSize: 12,
    color: COLORS.text,
  },
  reasonText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: SPACING.lg,
  },
  modalCourseName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  modalUnits: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: SPACING.lg,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  // Roadmap styles
  roadmapContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  semesterBlock: {
    marginBottom: SPACING.xl,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  semesterHeader: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  semesterTitleContainer: {
    flex: 1,
  },
  yearLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    opacity: 0.8,
  },
  semesterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  unitsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  unitsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  coursesInSemester: {
    padding: SPACING.md,
  },
  semesterCourseCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  lockedCourse: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  courseCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseCardLeft: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  courseCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  semesterCourseCode: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  semesterCourseName: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  courseUnitsText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
});
