// src/screens/faculty/FacultyDashboard.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import * as resourceService from '../../services/resourceService';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../../App';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'FacultyDashboard'>;

type Resource = resourceService.Resource;
type EventItem = resourceService.Event;

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavProp>();
  const isOrg = user?.userType === 'Student Organization';

  const [s, set] = useState({
    resources: [] as Resource[],
    resource: { title: '', url: '', description: '', hashtags: '' },

    events: [] as EventItem[],
    event: { title: '', date: '', location: '', description: '', hashtags: '', scoreboardCategory: '' as string },
  });

  const [loading, setLoading] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editForm, setEditForm] = useState({ title: '', url: '', date: '', location: '', description: '', hashtags: '', scoreboardCategory: '' });

  // Load resources and events on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resourcesRes, eventsRes] = await Promise.all([
        resourceService.getResources(),
        resourceService.getEvents(),
      ]);

      set((prev) => ({
        ...prev,
        resources: resourcesRes.success ? resourcesRes.resources || [] : [],
        events: eventsRes.success ? eventsRes.events || [] : [],
      }));
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const merge = (k: 'resource' | 'event') => (p: Partial<typeof s[typeof k]>) =>
    set(x => ({ ...x, [k]: { ...x[k], ...p } }));

  // Append a suggested tag to a comma-separated hashtag string (no duplicates)
  const appendTag = (current: string, tag: string): string => {
    const trimmed = current.trim();
    if (!trimmed) return tag;
    const existing = trimmed.split(',').map(t => t.trim().toLowerCase().replace(/^#/, ''));
    if (existing.includes(tag.toLowerCase())) return current;
    return `${trimmed}, ${tag}`;
  };

  const GRADE_CHIPS = ['freshman', 'sophomore', 'junior', 'senior', 'graduate'];

  // Parse hashtags from comma-separated string
  const parseHashtags = (hashtagStr: string): string[] => {
    if (!hashtagStr.trim()) return [];
    
    return hashtagStr
      .split(',')
      .map(tag => {
        tag = tag.trim();
        return tag.startsWith('#') ? tag : `#${tag}`;
      })
      .filter(tag => tag.length > 1);
  };

  const addResource = useCallback(async () => {
    console.log('addResource called');
    const { title, url, description, hashtags } = s.resource;
    console.log('Resource data:', { title, url, description, hashtags });
    
    if (!title.trim() || !url.trim()) {
      console.log('Validation failed: missing title or url');
      Alert.alert('Error', 'Title and URL are required');
      return;
    }

    const parsedHashtags = parseHashtags(hashtags);
    console.log('Parsed hashtags:', parsedHashtags);

    setLoading(true);
    try {
      const result = await resourceService.createResource({
        title: title.trim(),
        url: url.trim(),
        description: description?.trim(),
        hashtags: parsedHashtags,
      });

      console.log('Create resource result:', result);

      if (result.success && result.resource) {
        set(x => ({
          ...x,
          resources: [result.resource!, ...x.resources],
          resource: { title: '', url: '', description: '', hashtags: '' },
        }));
        Alert.alert('Success', 'Resource created successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to create resource');
      }
    } catch (error) {
      console.error('Error creating resource:', error);
      Alert.alert('Error', 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  }, [s.resource]);

  const startEditResource = (resource: Resource) => {
    console.log('Starting to edit resource:', resource._id);
    setEditingResource(resource);
    setEditForm({
      title: resource.title,
      url: resource.url,
      date: '',
      location: '',
      description: resource.description || '',
      hashtags: resource.hashtags.join(', '),
      scoreboardCategory: '',
    });
  };

  const startEditEvent = (event: EventItem) => {
    console.log('Starting to edit event:', event._id);
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      url: '',
      date: event.date,
      location: event.location || '',
      description: event.description || '',
      hashtags: event.hashtags.join(', '),
      scoreboardCategory: event.scoreboardCategory || '',
    });
  };

  const cancelEdit = () => {
    setEditingResource(null);
    setEditingEvent(null);
    setEditForm({ title: '', url: '', date: '', location: '', description: '', hashtags: '', scoreboardCategory: '' });
  };

  const saveResourceEdit = async () => {
    if (!editingResource) return;

    const { title, url, description, hashtags } = editForm;
    if (!title.trim() || !url.trim()) {
      Alert.alert('Error', 'Title and URL are required');
      return;
    }

    const parsedHashtags = parseHashtags(hashtags);

    setLoading(true);
    try {
      const result = await resourceService.updateResource(editingResource._id, {
        title: title.trim(),
        url: url.trim(),
        description: description?.trim(),
        hashtags: parsedHashtags,
      });

      if (result.success && result.resource) {
        set(x => ({
          ...x,
          resources: x.resources.map(r => r._id === editingResource._id ? result.resource! : r),
        }));
        cancelEdit();
        Alert.alert('Success', 'Resource updated successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to update resource');
      }
    } catch (error) {
      console.error('Error updating resource:', error);
      Alert.alert('Error', 'Failed to update resource');
    } finally {
      setLoading(false);
    }
  };

  const saveEventEdit = async () => {
    if (!editingEvent) return;

    const { title, date, location, description, hashtags, scoreboardCategory } = editForm;
    if (!title.trim() || !date.trim()) {
      Alert.alert('Error', 'Title and date are required');
      return;
    }

    const parsedHashtags = parseHashtags(hashtags);

    setLoading(true);
    try {
      const result = await resourceService.updateEvent(editingEvent._id, {
        title: title.trim(),
        date: date.trim(),
        location: location?.trim(),
        description: description?.trim(),
        hashtags: parsedHashtags,
        scoreboardCategory: scoreboardCategory || null,
      });

      if (result.success && result.event) {
        set(x => ({
          ...x,
          events: x.events.map(e => e._id === editingEvent._id ? result.event! : e),
        }));
        cancelEdit();
        Alert.alert('Success', 'Event updated successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const removeResource = async (id: string) => {
    console.log('removeResource called with id:', id);
    
    // For web, use window.confirm since Alert.alert with buttons doesn't work well
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this resource?');
      if (!confirmed) {
        console.log('Delete cancelled by user');
        return;
      }
    }
    
    const performDelete = async () => {
      console.log('Performing delete for resource:', id);
      setLoading(true);
      try {
        const result = await resourceService.deleteResource(id);
        console.log('Delete result:', result);
        
        if (result.success) {
          set(x => ({ ...x, resources: x.resources.filter(r => r._id !== id) }));
          Alert.alert('Success', 'Resource deleted');
        } else {
          Alert.alert('Error', result.error || 'Failed to delete resource');
        }
      } catch (error) {
        console.error('Error deleting resource:', error);
        Alert.alert('Error', 'Failed to delete resource');
      } finally {
        setLoading(false);
      }
    };
    
    // For mobile (iOS/Android), use Alert.alert with buttons
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Delete Resource',
        'Are you sure you want to delete this resource?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: performDelete },
        ]
      );
    } else {
      // Already confirmed via window.confirm above
      await performDelete();
    }
  };

  const addEvent = useCallback(async () => {
    console.log('addEvent called');
    const { title, date, location, description, hashtags, scoreboardCategory } = s.event;
    console.log('Event data:', { title, date, location, description, hashtags, scoreboardCategory });

    if (!title.trim() || !date.trim()) {
      console.log('Validation failed: missing title or date');
      Alert.alert('Error', 'Title and date are required');
      return;
    }

    const parsedHashtags = parseHashtags(hashtags);
    console.log('Parsed hashtags:', parsedHashtags);

    setLoading(true);
    try {
      const result = await resourceService.createEvent({
        title: title.trim(),
        date: date.trim(),
        location: location?.trim(),
        description: description?.trim(),
        hashtags: parsedHashtags,
        scoreboardCategory: scoreboardCategory || null,
      });

      console.log('Create event result:', result);

      if (result.success && result.event) {
        set(x => ({
          ...x,
          events: [result.event!, ...x.events],
          event: { title: '', date: '', location: '', description: '', hashtags: '', scoreboardCategory: '' },
        }));
        Alert.alert('Success', 'Event created successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event');
    } finally {
      setLoading(false);
    }
  }, [s.event]);

  const removeEvent = async (id: string) => {
    console.log('removeEvent called with id:', id);
    
    // For web, use window.confirm since Alert.alert with buttons doesn't work well
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this event?');
      if (!confirmed) {
        console.log('Delete cancelled by user');
        return;
      }
    }
    
    const performDelete = async () => {
      console.log('Performing delete for event:', id);
      setLoading(true);
      try {
        const result = await resourceService.deleteEvent(id);
        console.log('Delete result:', result);
        
        if (result.success) {
          set(x => ({ ...x, events: x.events.filter(e => e._id !== id) }));
          Alert.alert('Success', 'Event deleted');
        } else {
          Alert.alert('Error', result.error || 'Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        Alert.alert('Error', 'Failed to delete event');
      } finally {
        setLoading(false);
      }
    };
    
    // For mobile (iOS/Android), use Alert.alert with buttons
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Delete Event',
        'Are you sure you want to delete this event?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: performDelete },
        ]
      );
    } else {
      // Already confirmed via window.confirm above
      await performDelete();
    }
  };

  // ✅ Keep stable Input to prevent focus loss
  const Input = useCallback(
    (p: any) => (
      <TextInput
        {...p}
        style={[styles.input, p.style]}
        placeholderTextColor={COLORS.muted}
      />
    ),
    []
  );

  if (loading && s.resources.length === 0 && s.events.length === 0) {
    return (
      <View style={[styles.content, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.text, marginTop: SPACING.md }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        {isOrg ? 'Organization Dashboard' : 'Faculty Dashboard'}
      </Text>
      <Text
        style={{
          color: COLORS.muted,
          textAlign: 'center',
          marginTop: SPACING.xs,
          marginBottom: SPACING.lg,
        }}
      >
        Add resources and events with hashtags for students to browse.
      </Text>

      {/* PROFILE CONFIGURATION SECTION */}
      {user?.userType === 'Faculty' || user?.userType === 'Admin' ? (
        <Section title="Student Profile Configuration">
          <Text style={styles.helpText}>
            Manage available options for student profiles (majors, OSD options, financial statuses, etc.).
          </Text>
          <Button 
            label="Manage Profile Options" 
            onPress={() => navigation.navigate('ProfileConfiguration')}
          />
        </Section>
      ) : null}

      {/* RESOURCES SECTION */}
      <Section title="Add Resource">
        <Text style={styles.helpText}>
          Add a resource link for students. Include hashtags to help categorize it.
        </Text>
        <Input
          placeholder="Resource title (e.g., Career Workshop)"
          value={s.resource.title}
          onChangeText={(v: string) => merge('resource')({ title: v })}
        />
        <Input
          placeholder="URL (e.g., https://example.com)"
          value={s.resource.url}
          onChangeText={(v: string) => merge('resource')({ url: v })}
          autoCapitalize="none"
          keyboardType="url"
        />
        <Input
          placeholder="Description (optional)"
          value={s.resource.description}
          onChangeText={(v: string) => merge('resource')({ description: v })}
          multiline
          style={{ minHeight: 60 }}
        />
        <Input
          placeholder="Hashtags (e.g., career, workshop, internships)"
          value={s.resource.hashtags}
          onChangeText={(v: string) => merge('resource')({ hashtags: v })}
          autoCapitalize="none"
        />
        <Text style={styles.hashtagHint}>
          💡 Tip: Separate hashtags with commas. The # symbol is optional.
        </Text>
        <View style={styles.gradeChipsRow}>
          <Text style={styles.gradeChipsLabel}>Target grade: </Text>
          {GRADE_CHIPS.map(chip => (
            <TouchableOpacity
              key={chip}
              style={styles.gradeChip}
              onPress={() => merge('resource')({ hashtags: appendTag(s.resource.hashtags, chip) })}
            >
              <Text style={styles.gradeChipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button label={loading ? 'Adding...' : 'Add Resource'} onPress={addResource} disabled={loading} />
        
        {s.resources.length === 0 ? (
          <Text style={styles.emptyText}>No resources yet — add one above.</Text>
        ) : (
          <>
            <Text style={styles.listHeader}>Your Resources ({s.resources.length})</Text>
            {s.resources.map(r => (
              <View key={r._id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{r.title}</Text>
                  <Text style={styles.link} numberOfLines={1}>{r.url}</Text>
                  {r.description && <Text style={styles.body}>{r.description}</Text>}
                  <View style={styles.chipsWrap}>
                    {r.hashtags.map((tag, idx) => (
                      <View key={`${tag}-${idx}`} style={styles.chipSmall}>
                        <Text style={styles.chipTextSmall}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    onPress={() => {
                      console.log('Modify button clicked for resource:', r._id);
                      startEditResource(r);
                    }} 
                    style={styles.modifyBtn}
                  >
                    <Text style={styles.modifyBtnText}>Modify</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => {
                      console.log('Delete button clicked for resource:', r._id);
                      removeResource(r._id);
                    }} 
                    style={styles.deleteBtn}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
      </Section>

      {/* EVENTS SECTION */}
      <Section title="Add Event">
        <Text style={styles.helpText}>
          Create an event for students. Add hashtags to make it easy to discover.
        </Text>
        <Input
          placeholder="Event title (e.g., AI Research Symposium)"
          value={s.event.title}
          onChangeText={(v: string) => merge('event')({ title: v })}
        />
        <Input
          placeholder="Date & time (e.g., Nov 20, 2025 at 3:00 PM)"
          value={s.event.date}
          onChangeText={(v: string) => merge('event')({ date: v })}
        />
        <Input
          placeholder="Location (optional, e.g., King Hall Room 101)"
          value={s.event.location}
          onChangeText={(v: string) => merge('event')({ location: v })}
        />
        <Input
          placeholder="Description (optional)"
          value={s.event.description}
          onChangeText={(v: string) => merge('event')({ description: v })}
          multiline
          style={{ minHeight: 80 }}
        />
        <Input
          placeholder="Hashtags (e.g., research, AI, networking)"
          value={s.event.hashtags}
          onChangeText={(v: string) => merge('event')({ hashtags: v })}
          autoCapitalize="none"
        />
        <Text style={styles.hashtagHint}>
          Tip: Separate hashtags with commas. The # symbol is optional.
        </Text>
        <View style={styles.gradeChipsRow}>
          <Text style={styles.gradeChipsLabel}>Target grade: </Text>
          {GRADE_CHIPS.map(chip => (
            <TouchableOpacity
              key={chip}
              style={styles.gradeChip}
              onPress={() => merge('event')({ hashtags: appendTag(s.event.hashtags, chip) })}
            >
              <Text style={styles.gradeChipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.dropdownLabel}>Scoreboard Category (optional)</Text>
        <View style={styles.categoryDropdown}>
          {[
            { value: '', label: 'None' },
            { value: 'ACADEMIC_PROGRESS', label: 'Academic' },
            { value: 'CAREER_PREP', label: 'Career' },
            { value: 'COMMUNITY_LEADERSHIP', label: 'Community' },
          ].map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.categoryOption,
                s.event.scoreboardCategory === opt.value && styles.categoryOptionActive,
              ]}
              onPress={() => merge('event')({ scoreboardCategory: opt.value })}
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  s.event.scoreboardCategory === opt.value && styles.categoryOptionTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.categoryHint}>
          Link this event to the student scoreboard so RSVP'd students can earn points.
        </Text>

        <Button label={loading ? 'Adding...' : 'Add Event'} onPress={addEvent} disabled={loading} />
        
        {s.events.length === 0 ? (
          <Text style={styles.emptyText}>No events yet — add one above.</Text>
        ) : (
          <>
            <Text style={styles.listHeader}>Your Events ({s.events.length})</Text>
            {s.events.map(e => (
              <View key={e._id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{e.title}</Text>
                  <Text style={styles.dim}>{e.date}</Text>
                  {!!e.location && <Text style={styles.dim}>{e.location}</Text>}
                  {!!e.description && <Text style={styles.body}>{e.description}</Text>}
                  {!!e.scoreboardCategory && (
                    <View style={styles.scoreboardTag}>
                      <Text style={styles.scoreboardTagText}>
                        Scoreboard: {e.scoreboardCategory === 'ACADEMIC_PROGRESS' ? 'Academic' : e.scoreboardCategory === 'CAREER_PREP' ? 'Career' : 'Community'}
                      </Text>
                    </View>
                  )}
                  <View style={styles.chipsWrap}>
                    {e.hashtags.map((tag, idx) => (
                      <View key={`${tag}-${idx}`} style={styles.chipSmall}>
                        <Text style={styles.chipTextSmall}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    onPress={() => {
                      console.log('Modify button clicked for event:', e._id);
                      startEditEvent(e);
                    }} 
                    style={styles.modifyBtn}
                  >
                    <Text style={styles.modifyBtnText}>Modify</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => {
                      console.log('Delete button clicked for event:', e._id);
                      removeEvent(e._id);
                    }} 
                    style={styles.deleteBtn}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
      </Section>

      {/* EDIT RESOURCE MODAL */}
      <Modal
        visible={!!editingResource}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Resource</Text>
            <ScrollView>
              <Input
                placeholder="Resource title"
                value={editForm.title}
                onChangeText={(v: string) => setEditForm({ ...editForm, title: v })}
              />
              <Input
                placeholder="URL"
                value={editForm.url}
                onChangeText={(v: string) => setEditForm({ ...editForm, url: v })}
                autoCapitalize="none"
                keyboardType="url"
              />
              <Input
                placeholder="Description (optional)"
                value={editForm.description}
                onChangeText={(v: string) => setEditForm({ ...editForm, description: v })}
                multiline
                style={{ minHeight: 60 }}
              />
              <Input
                placeholder="Hashtags (e.g., career, workshop)"
                value={editForm.hashtags}
                onChangeText={(v: string) => setEditForm({ ...editForm, hashtags: v })}
                autoCapitalize="none"
              />
              <Text style={styles.hashtagHint}>
                💡 Tip: Separate hashtags with commas. The # symbol is optional.
              </Text>
              <View style={styles.gradeChipsRow}>
                <Text style={styles.gradeChipsLabel}>Target grade: </Text>
                {GRADE_CHIPS.map(chip => (
                  <TouchableOpacity
                    key={chip}
                    style={styles.gradeChip}
                    onPress={() => setEditForm({ ...editForm, hashtags: appendTag(editForm.hashtags, chip) })}
                  >
                    <Text style={styles.gradeChipText}>{chip}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={cancelEdit} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveResourceEdit} style={[styles.modalButton, styles.saveButton]} disabled={loading}>
                  <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* EDIT EVENT MODAL */}
      <Modal
        visible={!!editingEvent}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Event</Text>
            <ScrollView>
              <Input
                placeholder="Event title"
                value={editForm.title}
                onChangeText={(v: string) => setEditForm({ ...editForm, title: v })}
              />
              <Input
                placeholder="Date & time"
                value={editForm.date}
                onChangeText={(v: string) => setEditForm({ ...editForm, date: v })}
              />
              <Input
                placeholder="Location (optional)"
                value={editForm.location}
                onChangeText={(v: string) => setEditForm({ ...editForm, location: v })}
              />
              <Input
                placeholder="Description (optional)"
                value={editForm.description}
                onChangeText={(v: string) => setEditForm({ ...editForm, description: v })}
                multiline
                style={{ minHeight: 80 }}
              />
              <Input
                placeholder="Hashtags (e.g., research, AI)"
                value={editForm.hashtags}
                onChangeText={(v: string) => setEditForm({ ...editForm, hashtags: v })}
                autoCapitalize="none"
              />
              <Text style={styles.hashtagHint}>
                Tip: Separate hashtags with commas. The # symbol is optional.
              </Text>
              <View style={styles.gradeChipsRow}>
                <Text style={styles.gradeChipsLabel}>Target grade: </Text>
                {GRADE_CHIPS.map(chip => (
                  <TouchableOpacity
                    key={chip}
                    style={styles.gradeChip}
                    onPress={() => setEditForm({ ...editForm, hashtags: appendTag(editForm.hashtags, chip) })}
                  >
                    <Text style={styles.gradeChipText}>{chip}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.dropdownLabel}>Scoreboard Category (optional)</Text>
              <View style={styles.categoryDropdown}>
                {[
                  { value: '', label: 'None' },
                  { value: 'ACADEMIC_PROGRESS', label: 'Academic' },
                  { value: 'CAREER_PREP', label: 'Career' },
                  { value: 'COMMUNITY_LEADERSHIP', label: 'Community' },
                ].map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={[
                      styles.categoryOption,
                      editForm.scoreboardCategory === opt.value && styles.categoryOptionActive,
                    ]}
                    onPress={() => setEditForm({ ...editForm, scoreboardCategory: opt.value })}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        editForm.scoreboardCategory === opt.value && styles.categoryOptionTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.categoryHint}>
                Link this event to the student scoreboard so RSVP'd students can earn points.
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={cancelEdit} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveEventEdit} style={[styles.modalButton, styles.saveButton]} disabled={loading}>
                  <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FacultyDashboard;

/* ---------- Small reusable pieces ---------- */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);
const Button: React.FC<{ label: string; onPress: () => void; small?: boolean; disabled?: boolean }> = ({ label, onPress, small, disabled }) => (
  <TouchableOpacity 
    onPress={() => {
      console.log(`Button "${label}" pressed`);
      onPress();
    }} 
    style={[styles.button, small && styles.buttonSm, disabled && styles.buttonDisabled]} 
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  content: { padding: SPACING.xl },
  section: { backgroundColor: COLORS.card, borderRadius: 12, padding: SPACING.lg, marginBottom: SPACING.xl },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },

  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },

  button: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: 10, alignSelf: 'flex-start', marginTop: SPACING.sm },
  buttonSm: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: COLORS.onPrimary, fontWeight: '700' },
  
  helpText: { color: COLORS.text, opacity: 0.7, fontSize: 13, marginBottom: SPACING.sm },
  hashtagHint: { color: COLORS.primary, fontSize: 12, marginTop: -SPACING.xs, marginBottom: SPACING.xs, fontStyle: 'italic' },
  gradeChipsRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: SPACING.sm },
  gradeChipsLabel: { fontSize: 12, color: COLORS.muted, fontWeight: '600' },
  gradeChip: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  gradeChipText: { fontSize: 12, color: COLORS.text, fontWeight: '500' },

  listHeader: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginTop: SPACING.lg, marginBottom: SPACING.sm },
  listTitle: { fontWeight: '700', color: COLORS.text, marginBottom: 4, fontSize: 15 },
  link: { color: COLORS.primary, fontSize: 13 },
  body: { color: COLORS.text, marginTop: SPACING.xs, fontSize: 13, lineHeight: 18 },
  dim: { color: COLORS.text, opacity: 0.7, fontSize: 13, marginTop: 2 },

  card: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 10, 
    padding: SPACING.md, 
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  modifyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  modifyBtnText: {
    color: COLORS.onPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.sm },
  chipSmall: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: 12 },
  chipTextSmall: { color: COLORS.onPrimary, fontSize: 11, fontWeight: '600' },

  emptyText: {
    color: COLORS.text,
    opacity: 0.6,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: SPACING.md,
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    color: COLORS.onPrimary,
    fontWeight: '700',
  },

  // Scoreboard category dropdown
  dropdownLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginTop: SPACING.xs,
  },
  categoryDropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  categoryOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  categoryOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  categoryOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryOptionTextActive: {
    color: COLORS.onPrimary,
  },
  categoryHint: {
    fontSize: 12,
    color: COLORS.muted,
    fontStyle: 'italic',
    marginBottom: SPACING.sm,
  },
  scoreboardTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#ca8a0420',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: SPACING.xs,
  },
  scoreboardTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ca8a04',
  },
});
