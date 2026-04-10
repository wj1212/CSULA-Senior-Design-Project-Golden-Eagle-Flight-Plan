// src/screens/student/ResourcesScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import * as resourceService from '../../services/resourceService';

type Resource = resourceService.Resource;
type Event = resourceService.Event;

const SCOREBOARD_CATEGORY_LABEL: Record<string, string> = {
  ACADEMIC_PROGRESS: 'Academic',
  CAREER_PREP: 'Career',
  COMMUNITY_LEADERSHIP: 'Community',
};

export const ResourcesScreen: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'resources' | 'events'>('all');
  const [togglingRsvp, setTogglingRsvp] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedHashtag]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resourcesRes, eventsRes, hashtagsRes] = await Promise.all([
        resourceService.getResources(selectedHashtag || undefined),
        resourceService.getEvents(selectedHashtag || undefined),
        resourceService.getHashtags(),
      ]);

      if (resourcesRes.success) setResources(resourcesRes.resources || []);
      if (eventsRes.success) setEvents(eventsRes.events || []);
      if (hashtagsRes.success) setHashtags(hashtagsRes.hashtags || []);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [selectedHashtag]);

  const handleRsvpToggle = async (event: Event) => {
    if (togglingRsvp) return;
    setTogglingRsvp(event._id);

    const wasRsvped = event.isRsvped;

    // Optimistic update
    setEvents((prev) =>
      prev.map((e) =>
        e._id === event._id
          ? {
              ...e,
              isRsvped: !wasRsvped,
              rsvpCount: wasRsvped ? e.rsvpCount - 1 : e.rsvpCount + 1,
            }
          : e
      )
    );

    const result = wasRsvped
      ? await resourceService.cancelRsvp(event._id)
      : await resourceService.rsvpEvent(event._id);

    if (!result.success) {
      // Revert on failure
      setEvents((prev) =>
        prev.map((e) =>
          e._id === event._id
            ? { ...e, isRsvped: wasRsvped, rsvpCount: event.rsvpCount }
            : e
        )
      );
      Alert.alert('Error', result.error || 'Failed to update RSVP');
    }

    setTogglingRsvp(null);
  };

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Failed to open link');
    }
  };

  const renderHashtagFilter = () => (
    <View style={styles.hashtagsSection}>
      <Text style={styles.hashtagsTitle}>Browse by Category:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hashtagsScroll}>
        <TouchableOpacity
          style={[styles.hashtagChip, !selectedHashtag && styles.hashtagChipActive]}
          onPress={() => setSelectedHashtag(null)}
        >
          <Text style={[styles.hashtagText, !selectedHashtag && styles.hashtagTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {hashtags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[styles.hashtagChip, selectedHashtag === tag && styles.hashtagChipActive]}
            onPress={() => setSelectedHashtag(tag)}
          >
            <Text style={[styles.hashtagText, selectedHashtag === tag && styles.hashtagTextActive]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {[
        { key: 'all', label: 'All' },
        { key: 'resources', label: 'Resources' },
        { key: 'events', label: 'Events' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          onPress={() => setActiveTab(tab.key as any)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderResource = (resource: Resource) => (
    <TouchableOpacity
      key={resource._id}
      style={styles.card}
      onPress={() => openUrl(resource.url)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="document-text" size={24} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: SPACING.sm }}>
          <Text style={styles.cardTitle}>{resource.title}</Text>
          <Text style={styles.cardMeta}>By {resource.createdByName}</Text>
        </View>
        <Ionicons name="arrow-forward-circle" size={24} color={COLORS.primary} />
      </View>
      {resource.description && (
        <Text style={styles.cardDescription}>{resource.description}</Text>
      )}
      <View style={styles.cardHashtags}>
        {resource.hashtags.map((tag, idx) => (
          <View key={`${tag}-${idx}`} style={styles.cardHashtagChip}>
            <Text style={styles.cardHashtagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderEvent = (event: Event) => (
    <View key={event._id} style={[styles.card, styles.eventCard]}>
      <View style={styles.cardHeader}>
        <Ionicons name="calendar" size={24} color={COLORS.secondary} />
        <View style={{ flex: 1, marginLeft: SPACING.sm }}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardMeta}>By {event.createdByName}</Text>
        </View>
        {event.scoreboardCategory && (
          <View style={styles.scoreboardChip}>
            <Ionicons name="trophy" size={12} color={COLORS.secondary} />
            <Text style={styles.scoreboardChipText}>
              {SCOREBOARD_CATEGORY_LABEL[event.scoreboardCategory] || 'Scoreboard'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.eventDetails}>
        <View style={styles.eventDetailRow}>
          <Ionicons name="time" size={16} color={COLORS.text} />
          <Text style={styles.eventDetailText}>{event.date}</Text>
        </View>
        {event.location && (
          <View style={styles.eventDetailRow}>
            <Ionicons name="location" size={16} color={COLORS.text} />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        )}
      </View>
      {event.description && (
        <Text style={styles.cardDescription}>{event.description}</Text>
      )}
      <View style={styles.cardHashtags}>
        {event.hashtags.map((tag, idx) => (
          <View key={`${tag}-${idx}`} style={styles.cardHashtagChip}>
            <Text style={styles.cardHashtagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.rsvpRow}>
        <TouchableOpacity
          style={[styles.rsvpButton, event.isRsvped && styles.rsvpButtonActive]}
          onPress={() => handleRsvpToggle(event)}
          disabled={togglingRsvp === event._id}
          activeOpacity={0.7}
        >
          <Ionicons
            name={event.isRsvped ? 'checkmark-circle' : 'add-circle-outline'}
            size={18}
            color={event.isRsvped ? COLORS.onPrimary : COLORS.secondary}
          />
          <Text style={[styles.rsvpButtonText, event.isRsvped && styles.rsvpButtonTextActive]}>
            {event.isRsvped ? "RSVP'd" : 'RSVP'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.rsvpCount}>
          {event.rsvpCount} {event.rsvpCount === 1 ? 'person' : 'people'} going
        </Text>
      </View>
    </View>
  );

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'resources':
        return resources;
      case 'events':
        return events;
      default:
        return [...events, ...resources].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  };

  if (loading && resources.length === 0 && events.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading resources...</Text>
      </View>
    );
  }

  const filteredContent = getFilteredContent();

  return (
    <View style={styles.container}>
      {renderHashtagFilter()}
      {renderTabs()}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {selectedHashtag && (
          <View style={styles.filterBanner}>
            <Text style={styles.filterBannerText}>
              Showing results for {selectedHashtag}
            </Text>
            <TouchableOpacity onPress={() => setSelectedHashtag(null)}>
              <Text style={styles.filterBannerClear}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredContent.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color={COLORS.muted} />
            <Text style={styles.emptyStateTitle}>No Content Found</Text>
            <Text style={styles.emptyStateMessage}>
              {selectedHashtag
                ? `No resources or events found for ${selectedHashtag}`
                : 'No resources or events available yet. Check back soon!'}
            </Text>
          </View>
        ) : (
          <>
            {activeTab === 'all' || activeTab === 'events'
              ? events.map(renderEvent)
              : null}
            {activeTab === 'all' || activeTab === 'resources'
              ? resources.map(renderResource)
              : null}
          </>
        )}
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
  loadingText: {
    color: COLORS.text,
    marginTop: SPACING.md,
    fontSize: 16,
  },

  // Hashtag Filter Section
  hashtagsSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  hashtagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  hashtagsScroll: {
    flexDirection: 'row',
  },
  hashtagChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hashtagChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  hashtagText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  hashtagTextActive: {
    color: COLORS.onPrimary,
    fontWeight: '700',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.muted,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },

  // Filter Banner
  filterBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  filterBannerText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  filterBannerClear: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  // Cards
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardMeta: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  cardHashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  cardHashtagChip: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardHashtagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },

  // Event Details
  eventDetails: {
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  eventDetailText: {
    fontSize: 13,
    color: COLORS.text,
  },

  // RSVP
  rsvpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  rsvpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  rsvpButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  rsvpButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  rsvpButtonTextActive: {
    color: COLORS.onPrimary,
  },
  rsvpCount: {
    fontSize: 12,
    color: COLORS.muted,
  },
  scoreboardChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreboardChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xl,
  },
});

