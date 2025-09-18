import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OpportunityCard } from '../components/OpportunityCard';
import { mockOpportunities } from '../data/mockData';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

export const OpportunitiesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Internships', 'Research', 'Leadership'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opportunities</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search opportunities..."
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.filterTabActive
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === filter && styles.filterTabTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Opportunities List */}
      <ScrollView style={styles.opportunitiesList}>
        {mockOpportunities.map((opportunity) => (
          <OpportunityCard 
            key={opportunity.id} 
            opportunity={opportunity}
            onPress={() => {
              console.log('Opportunity pressed:', opportunity.title);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xxl,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  filterContainer: {
    marginBottom: 20,
    flexGrow: 0,
  },
  filterTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTabActive: {
    backgroundColor: COLORS.buttonPrimaryBackground, // Gold
  },
  filterTabText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: COLORS.buttonPrimaryText, // Black
  },
  opportunitiesList: {
    flex: 1,
  },
});