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
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { useAuth } from "../../contexts/AuthContext";
import { curriculumService } from "../../services/curriculumService";

export const CoursesScreen: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'roadmap' | 'available' | 'all' | 'curriculum'>('curriculum');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [curriculum, setCurriculum] = useState<any>(null);
  const [curriculumLoading, setCurriculumLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
    } catch (error) {
      Alert.alert("Error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadCurriculum = async (major: string) => {
    try {
      setCurriculumLoading(true);
      const data = await curriculumService.getCurriculumByMajor(major);
      setCurriculum(data);
    } catch (err) {
      console.error("Failed to load curriculum:", err);
      Alert.alert("Error", "Failed to load curriculum");
    } finally {
      setCurriculumLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    if (user?.major) {
      loadCurriculum(user.major);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.major) {
      await loadCurriculum(user.major);
    }
    setRefreshing(false);
  };

  const renderCurriculum = () => {
    if (curriculumLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (!curriculum) {
      return <Text>No curriculum found</Text>;
    }

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>{curriculum.major}</Text>

        {/* Description */}
        {curriculum.description ? (
          <Text style={styles.description}>{curriculum.description}</Text>
        ) : null}

        {/* Sections */}
        {curriculum.sections.map((section: any, idx: number) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>

            {section.courses.map((course: string, i: number) => {
              const isHeader =
                course.toLowerCase().includes("select") ||
                course.toLowerCase().includes("required") ||
                course.toLowerCase().includes("note");

              return (
                <Text
                  key={i}
                  style={isHeader ? styles.groupTitle : styles.courseText}
                >
                  {isHeader ? course : `• ${course}`}
                </Text>
              );
            })}
          </View>
        ))}

        {/* Link */}
        {curriculum.curriculumLink ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(curriculum.curriculumLink)}
          >
            <Text style={styles.link}>
              View Full Curriculum
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'curriculum':
        return renderCurriculum();
      default:
        return (
          <View style={styles.tabContent}>
            <Text>Other tabs still working here...</Text>
          </View>
        );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'curriculum' && styles.activeTab]}
            onPress={() => setActiveTab('curriculum')}
          >
            <Ionicons
              name="book"
              size={18}
              color={activeTab === 'curriculum' ? '#000' : COLORS.text}
            />
            <Text style={styles.tabText}>Curriculum</Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  tabContainer: {
    flexDirection: 'row',
    margin: SPACING.lg,
  },

  tab: {
    padding: SPACING.md,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontWeight: '600',
  },

  tabContent: {
    padding: SPACING.lg,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    marginBottom: 12,
    color: "#555",
  },

  groupTitle: {
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
  },

  courseText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
    color: "#444",
  },

  link: {
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: "600",
  },
});