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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { useAuth } from "../../contexts/AuthContext";
import { curriculumService } from "../../services/curriculumService";

export const CoursesScreen: React.FC = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'roadmap' | 'available' | 'all' | 'curriculum'>('roadmap');

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
      return (
        <View style={styles.tabContent}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }

    if (!curriculum) {
      return (
        <View style={styles.tabContent}>
          <Text>No curriculum found for your major</Text>
        </View>
      );
    }

    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>{curriculum.major}</Text>

        <Text style={styles.subHeader}>Lower Division</Text>
        {curriculum.lowerDivision.map((c: string, i: number) => (
          <Text key={i} style={styles.courseText}>• {c}</Text>
        ))}

        <Text style={styles.subHeader}>Upper Division</Text>
        {curriculum.upperDivision.map((c: string, i: number) => (
          <Text key={i} style={styles.courseText}>• {c}</Text>
        ))}

        <Text style={styles.subHeader}>Electives</Text>
        {curriculum.electives.map((c: string, i: number) => (
          <Text key={i} style={styles.courseText}>• {c}</Text>
        ))}

        <Text style={styles.link}>
          View Full Curriculum: {curriculum.curriculumLink}
        </Text>
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
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'curriculum' && styles.activeTab]}
            onPress={() => setActiveTab('curriculum')}
          >
            <Ionicons name="book" size={18} color={activeTab === 'curriculum' ? '#000' : COLORS.text} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },

  courseText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
  },

  link: {
    marginTop: 16,
    color: "blue",
  },
});