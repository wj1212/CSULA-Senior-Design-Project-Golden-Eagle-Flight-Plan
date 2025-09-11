import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onPress?: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  onPress 
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'briefcase-outline';
      case 'Research':
        return 'flask-outline';
      case 'Leadership':
        return 'trophy-outline';
      default:
        return 'document-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return '#2563eb';
      case 'Research':
        return '#059669';
      case 'Leadership':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={getIcon(opportunity.type) as any} 
            size={24} 
            color={getTypeColor(opportunity.type)} 
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{opportunity.title}</Text>
          <Text style={styles.company}>{opportunity.company}</Text>
          <Text style={styles.deadline}>Deadline: {opportunity.deadline}</Text>
        </View>
        <View style={styles.matchContainer}>
          <Text style={styles.match}>{opportunity.match}%</Text>
          <Text style={styles.matchLabel}>match</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Learn More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  deadline: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
  },
  matchContainer: {
    alignItems: 'center',
  },
  match: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  matchLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});