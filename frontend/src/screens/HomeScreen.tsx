import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from '../components/StatCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { mockUser, mockOpportunities, mockCourses } from '../data/mockData';
import { CircleButton } from '../components/CircleButton';

export const HomeScreen: React.FC = () => {

  const handleAcademicPress = () => console.log('Academic Press');
  const handleCareerPress = () => console.log('Career Press');
  const handleLeadershipPress = () => console.log('Leadership Press');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Welcome back, {mockUser.name.split(' ')[0]}!
      </Text>

      <View style={styles.circleNavContainer}>
        <CircleButton title="Academic" onPress={handleAcademicPress} />
        <CircleButton title="Career skills" onPress={handleCareerPress} />
        <CircleButton title="Leadership" onPress={handleLeadershipPress} />
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

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatCard value={mockUser.gpa} label="Current GPA" />
        <StatCard value={mockUser.credits} label="Credits Earned" />
        <StatCard value="73%" label="Degree Progress" />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="book-outline" size={24} color="#2563eb" />
            <Text style={styles.quickActionText}>Add Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="target-outline" size={24} color="#2563eb" />
            <Text style={styles.quickActionText}>Find Opportunities</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="school-outline" size={24} color="#2563eb" />
            <Text style={styles.quickActionText}>View Plan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {mockOpportunities.slice(0, 2).map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}
      </View>

      {/* Recommended Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Courses - Fall 2025</Text>
        {mockCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseCredits}>{course.credits} credits</Text>
            </View>
            <View style={[
              styles.priorityBadge,
              course.priority === 'High' ? styles.highPriority : styles.mediumPriority
            ]}>
              <Text style={[
                styles.priorityText,
                course.priority === 'High' ? styles.highPriorityText : styles.mediumPriorityText
              ]}>
                {course.priority}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginHorizontal: -8,
  },
  circleNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  courseName: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  courseCredits: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  highPriority: {
    backgroundColor: '#fef2f2',
  },
  mediumPriority: {
    backgroundColor: '#fefbf2',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  highPriorityText: {
    color: '#dc2626',
  },
  mediumPriorityText: {
    color: '#d97706',
  },
});