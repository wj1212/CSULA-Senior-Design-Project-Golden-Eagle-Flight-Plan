import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

interface StatCardProps {
  value: string | number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.xxl,
    borderRadius: SPACING.xxl,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flex: 1,
    margin: SPACING.md,
  },
  value: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});