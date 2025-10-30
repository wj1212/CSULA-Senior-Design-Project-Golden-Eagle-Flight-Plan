// src/screens/admin/AdminDashboard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const AdminDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>
        Admin accounts are created manually in the DB and currently have limited UI.
      </Text>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.xl, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  subtitle: { color: COLORS.text, textAlign: 'center', fontSize: 14 },
});
