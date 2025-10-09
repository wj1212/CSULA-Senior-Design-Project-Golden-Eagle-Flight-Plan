import React, { useState } from 'react';
import { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OpportunityCard } from '../components/OpportunityCard';
import { mockOpportunities } from '../data/mockData';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { Opportunity } from '../types';

export const OpportunitiesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const filters = ['All', 'Internships', 'Research', 'Leadership'];
  const filteredOpportunities = useMemo(() => {
    if (activeFilter === 'All') { return mockOpportunities; }
    return mockOpportunities.filter((opp) => opp.type === activeFilter);
  }, [activeFilter]);

  const handleCardPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) { await Linking.openURL(url); }
    else { console.log(`Invalid URL provided: ${url}`); }
  };

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
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onApplyPress={() => handleCardPress(opportunity.link)}
            onLearnMorePress={() => setSelectedOpportunity(opportunity)}
          />
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedOpportunity !== null} 
        onRequestClose={() => setSelectedOpportunity(null)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedOpportunity?.title}</Text>
            <Text style={styles.modalCompany}>{selectedOpportunity?.company}</Text>
            <Text style={styles.modalDescription}>{selectedOpportunity?.description}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelectedOpportunity(null)} 
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCompany: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.buttonPrimaryBackground,
  },
  modalButtonText: {
    color: COLORS.buttonPrimaryText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});