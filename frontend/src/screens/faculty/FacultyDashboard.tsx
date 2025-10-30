// src/screens/faculty/FacultyDashboard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const FacultyDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Dashboard</Text>
      <Text style={styles.subtitle}>
        This is a faculty-only view. Faculty accounts currently only have authentication and userType.
      </Text>
    </View>
  );
};

export default FacultyDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.xl, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  subtitle: { color: COLORS.text, textAlign: 'center', fontSize: 14 },
});
