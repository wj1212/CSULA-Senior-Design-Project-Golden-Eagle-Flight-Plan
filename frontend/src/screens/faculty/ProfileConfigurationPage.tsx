import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import profileConfigService, { type ProfileConfig } from '../../services/profileConfigService';
import { useAuth } from '../../contexts/AuthContext';

type FieldName = 'majors' | 'osdOptions' | 'financialStatuses' | 'gradeLevels' | 'commuteStatuses';

interface EditingState {
  field: FieldName | null;
  newValue: string;
}

interface CareerInterestEditingState {
  selectedMajor: string | null;
  newInterest: string;
}

const ProfileConfigurationPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.userType === 'Admin';
  const isFaculty = user?.userType === 'Faculty';

  const [config, setConfig] = useState<ProfileConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingState, setEditingState] = useState<EditingState>({ field: null, newValue: '' });
  const [selectedField, setSelectedField] = useState<FieldName>('majors');
  const [careerInterestEditing, setCareerInterestEditing] = useState<CareerInterestEditingState>({
    selectedMajor: null,
    newInterest: '',
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const result = await profileConfigService.getConfig();
      if (result.success || result.config) {
        setConfig(result.config);
      } else {
        Alert.alert('Error', result.error || 'Failed to load configuration');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load configuration');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = async () => {
    if (!editingState.newValue.trim() || !editingState.field) {
      Alert.alert('Error', 'Please enter a value');
      return;
    }

    setSaving(true);
    try {
      const result = await profileConfigService.addOption(editingState.field, editingState.newValue.trim());
      if (result.success || result.config) {
        setConfig(result.config);
        setEditingState({ field: null, newValue: '' });
        Alert.alert('Success', 'Option added');
      } else {
        Alert.alert('Error', result.error || 'Failed to add option');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add option');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOption = async (field: FieldName, option: string) => {
    Alert.alert('Delete Option', `Remove "${option}"?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          setSaving(true);
          try {
            const result = await profileConfigService.removeOption(field, option);
            if (result.success || result.config) {
              setConfig(result.config);
              Alert.alert('Success', 'Option removed');
            } else {
              Alert.alert('Error', result.error || 'Failed to remove option');
            }
          } catch (error) {
            Alert.alert('Error', 'Failed to remove option');
            console.error(error);
          } finally {
            setSaving(false);
          }
        },
      },
    ]);
  };

  const handleAddCareerInterest = async () => {
    if (!careerInterestEditing.selectedMajor || !careerInterestEditing.newInterest.trim()) {
      Alert.alert('Error', 'Please select a major and enter an interest');
      return;
    }

    setSaving(true);
    try {
      const currentInterests = config?.careerInterests || {};
      const majorInterests = currentInterests[careerInterestEditing.selectedMajor] || [];

      if (majorInterests.includes(careerInterestEditing.newInterest.trim())) {
        Alert.alert('Error', 'This interest already exists for this major');
        setSaving(false);
        return;
      }

      const updated = await profileConfigService.updateConfig({
        careerInterests: {
          ...currentInterests,
          [careerInterestEditing.selectedMajor]: [...majorInterests, careerInterestEditing.newInterest.trim()],
        },
      });

      if (updated.success || updated.config) {
        setConfig(updated.config);
        setCareerInterestEditing({ selectedMajor: careerInterestEditing.selectedMajor, newInterest: '' });
        Alert.alert('Success', 'Career interest added');
      } else {
        Alert.alert('Error', updated.error || 'Failed to add career interest');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add career interest');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCareerInterest = async (major: string, interest: string) => {
    Alert.alert('Delete Interest', `Remove "${interest}" from ${major}?`, [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          setSaving(true);
          try {
            const currentInterests = config?.careerInterests || {};
            const majorInterests = currentInterests[major] || [];

            const updated = await profileConfigService.updateConfig({
              careerInterests: {
                ...currentInterests,
                [major]: majorInterests.filter((int) => int !== interest),
              },
            });

            if (updated.success || updated.config) {
              setConfig(updated.config);
              Alert.alert('Success', 'Career interest removed');
            } else {
              Alert.alert('Error', updated.error || 'Failed to remove interest');
            }
          } catch (error) {
            Alert.alert('Error', 'Failed to remove interest');
            console.error(error);
          } finally {
            setSaving(false);
          }
        },
      },
    ]);
  };

  if (!isAdmin && !isFaculty) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Only Faculty and Admin can access this page</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!config) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load configuration</Text>
      </View>
    );
  }

  const fieldConfigs: Record<
    FieldName,
    {
      label: string;
      description: string;
      icon: keyof typeof Ionicons.glyphMap;
    }
  > = {
    majors: {
      label: 'Majors',
      description: 'Available degree programs',
      icon: 'school',
    },
    osdOptions: {
      label: 'OSD Accommodations',
      description: 'Office of Students with Disabilities options',
      icon: 'accessibility',
    },
    financialStatuses: {
      label: 'Financial Status',
      description: 'Funding methods available to students',
      icon: 'cash',
    },
    gradeLevels: {
      label: 'Grade Levels',
      description: 'Available academic standings',
      icon: 'layers',
    },
    commuteStatuses: {
      label: 'Commute Status',
      description: 'Housing and commute options',
      icon: 'car',
    },
  };

  const fieldConfig = fieldConfigs[selectedField];
  const fieldOptions = config[selectedField] || [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Student Profile Configuration</Text>
          <Text style={styles.subtitle}>Manage available options for student profiles</Text>
        </View>

        {/* Tab-like Navigation */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
          {(Object.keys(fieldConfigs) as FieldName[]).map((field) => (
            <TouchableOpacity
              key={field}
              style={[
                styles.tabButton,
                selectedField === field && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedField(field)}
            >
              <Ionicons
                name={fieldConfigs[field].icon}
                size={20}
                color={selectedField === field ? COLORS.white : COLORS.text}
              />
              <Text
                style={[
                  styles.tabLabel,
                  selectedField === field && styles.tabLabelActive,
                ]}
              >
                {fieldConfigs[field].label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Field Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>{fieldConfig.label}</Text>
          <Text style={styles.descriptionText}>{fieldConfig.description}</Text>
        </View>

        {/* Current Options List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Options ({fieldOptions.length})</Text>
          {fieldOptions.length === 0 ? (
            <Text style={styles.emptyText}>No options configured</Text>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={fieldOptions}
              keyExtractor={(item, index) => `${selectedField}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.optionItem}>
                  <View style={styles.optionContent}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                    <Text style={styles.optionText}>{item}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteOption(selectedField, item)}
                    disabled={saving}
                  >
                    <Ionicons name="trash" size={18} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        {/* Add New Option */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Option</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder={`New ${fieldConfig.label.toLowerCase()}`}
              placeholderTextColor={COLORS.placeholder}
              value={editingState.newValue}
              onChangeText={(text) =>
                setEditingState({ ...editingState, field: selectedField, newValue: text })
              }
              editable={!saving}
            />
            <TouchableOpacity
              style={[styles.addButton, saving && styles.buttonDisabled]}
              onPress={handleAddOption}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Ionicons name="add" size={24} color={COLORS.white} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Career Interests by Major */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Interests by Major</Text>
          <Text style={styles.helpText}>
            Manage career interest options for each major
          </Text>

          {/* Major Selector */}
          <View style={styles.majorSelectorContainer}>
            <Text style={styles.label}>Select Major:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.majorScroll}>
              {(config?.majors || []).map((majorName) => (
                <TouchableOpacity
                  key={majorName}
                  style={[
                    styles.majorButton,
                    careerInterestEditing.selectedMajor === majorName && styles.majorButtonActive,
                  ]}
                  onPress={() =>
                    setCareerInterestEditing({
                      ...careerInterestEditing,
                      selectedMajor: majorName,
                    })
                  }
                  disabled={saving}
                >
                  <Text
                    style={[
                      styles.majorButtonText,
                      careerInterestEditing.selectedMajor === majorName &&
                        styles.majorButtonTextActive,
                    ]}
                  >
                    {majorName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Current Interests for Selected Major */}
          {careerInterestEditing.selectedMajor && (
            <>
              <Text style={styles.subSectionTitle}>
                Interests for {careerInterestEditing.selectedMajor}
              </Text>
              {((config?.careerInterests || {})[careerInterestEditing.selectedMajor] || []).length === 0 ? (
                <Text style={styles.emptyText}>No interests configured</Text>
              ) : (
                <FlatList
                  scrollEnabled={false}
                  data={(config?.careerInterests || {})[careerInterestEditing.selectedMajor] || []}
                  keyExtractor={(item, index) => `${careerInterestEditing.selectedMajor}-${index}`}
                  renderItem={({ item }) => (
                    <View style={styles.optionItem}>
                      <View style={styles.optionContent}>
                        <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                        <Text style={styles.optionText}>{item}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDeleteCareerInterest(careerInterestEditing.selectedMajor!, item)
                        }
                        disabled={saving}
                      >
                        <Ionicons name="trash" size={18} color={COLORS.danger} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}

              {/* Add New Interest */}
              <View style={styles.addInterestContainer}>
                <Text style={styles.subSectionTitle}>Add New Interest</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="E.g., Software Engineering"
                    placeholderTextColor={COLORS.placeholder}
                    value={careerInterestEditing.newInterest}
                    onChangeText={(text) =>
                      setCareerInterestEditing({
                        ...careerInterestEditing,
                        newInterest: text,
                      })
                    }
                    editable={!saving}
                  />
                  <TouchableOpacity
                    style={[styles.addButton, saving && styles.buttonDisabled]}
                    onPress={handleAddCareerInterest}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Ionicons name="add" size={24} color={COLORS.white} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            Changes here will be visible to all students when they update their profiles.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
  tabContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.lightGray,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.md,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabLabel: {
    marginLeft: SPACING.sm,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  tabLabelActive: {
    color: COLORS.white,
  },
  descriptionBox: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.lightPrimary,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  section: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 14,
    color: COLORS.text,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  infoBox: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.lg,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    marginLeft: SPACING.md,
    flex: 1,
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  majorSelectorContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  majorScroll: {
    marginBottom: SPACING.md,
  },
  majorButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  majorButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  majorButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  majorButtonTextActive: {
    color: COLORS.white,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  addInterestContainer: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  helpText: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginBottom: SPACING.md,
  },
  danger: {
    color: COLORS.danger,
  },
  success: {
    color: COLORS.success,
  },
});

export default ProfileConfigurationPage;
