import React from 'react';
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
import { StatCard } from '../components/StatCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { mockUser, mockOpportunities, mockCourses } from '../data/mockData';
import { CircleButton } from '../components/CircleButton';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const handleAcademicPress = () => console.log('Academic Press');
  const handleCareerPress = () => console.log('Career Press');
  const handleLeadershipPress = () => console.log('Leadership Press');
  const sidePadding = SPACING.xl * 2;
  const spacingBetweenCircles = SPACING.sm * 2;
  const circleSize = (width - sidePadding - spacingBetweenCircles) / 3;

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
              Welcome back, {mockUser.name.split(' ')[0]}!
            </Text>

            <View style={styles.circleNavContainer}>
              <CircleButton title="Academic" onPress={handleAcademicPress} size={circleSize} />
              <CircleButton title="Career skills" onPress={handleCareerPress} size={circleSize} />
              <CircleButton title="Leadership" onPress={handleLeadershipPress} size={circleSize} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended</Text>
              {mockOpportunities.slice(0, 2).map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </View>

            <View style={styles.statsContainer}>
              <StatCard value={mockUser.gpa} label="Current GPA" />
              <StatCard value={mockUser.credits} label="Credits Earned" />
              <StatCard value="73%" label="Degree Progress" />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction}>

                  <Ionicons name="book-outline" size={24} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>Add Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>

                  <Ionicons name="target-outline" size={24} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>Find Opportunities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>

                  <Ionicons name="school-outline" size={24} color={COLORS.primary} />
                  <Text style={styles.quickActionText}>View Plan</Text>
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
      </KeyboardAvoidingView >
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginHorizontal: -SPACING.sm,
  },
  circleNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.xxxl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    borderRadius: SPACING.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SPACING.xs,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    marginTop: SPACING.md,
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },


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