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
      const result = await authService.getStudentDetails(student.id);
      console.log('Student details result:', result);
      
      if (result.success && result.student) {
        // Ensure student has id field mapped from _id
        const studentData = {
          ...result.student,
          id: result.student._id || result.student.id,
        };
        setStudentDetails(studentData);
      } else {
        Alert.alert('Error', result.error || 'Failed to load student details');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      Alert.alert('Error', 'Failed to load student details: ' + (error instanceof Error ? error.message : String(error)));
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
                <View style={styles.profileHeader}>
                  <View style={styles.profileInitial}>
                    <Text style={styles.profileInitialText}>
                      {studentDetails.name?.charAt(0).toUpperCase() || '?'}
                    </Text>
                  </View>
                  <Text style={styles.profileName}>{studentDetails.name || 'N/A'}</Text>
                  <Text style={styles.profileEmail}>{studentDetails.email || 'N/A'}</Text>
                </View>

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
});

export default StudentProfileViewer;