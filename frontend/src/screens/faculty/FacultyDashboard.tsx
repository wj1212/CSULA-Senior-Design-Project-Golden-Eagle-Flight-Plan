// src/screens/faculty/FacultyDashboard.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

type Resource = { id: string; title: string; url: string };
type EventItem = { id: string; title: string; date: string; location?: string; description?: string };

const FacultyDashboard: React.FC = () => {
  const [s, set] = useState({
    resources: [
      { id: '1', title: 'Syllabus Template', url: 'https://example.edu/syllabus' },
      { id: '2', title: 'Faculty Handbook', url: 'https://example.edu/handbook' },
    ] as Resource[],
    resource: { title: '', url: '' },

    events: [] as EventItem[],
    event: { title: '', date: '', location: '', description: '' },

    hashtags: ['#faculty', '#events'],
    tag: '',
  });

  const on = (k: keyof typeof s) => (v: any) => set(x => ({ ...x, [k]: v }));
  const merge = (k: 'resource' | 'event') => (p: Partial<typeof s[typeof k]>) =>
    set(x => ({ ...x, [k]: { ...x[k], ...p } }));

  const addResource = useCallback(() => {
    const { title, url } = s.resource;
    if (!title.trim() || !url.trim()) return;
    set(x => ({
      ...x,
      resources: [...x.resources, { id: String(Date.now()), title: title.trim(), url: url.trim() }],
      resource: { title: '', url: '' },
    }));
  }, [s.resource]);

  const removeResource = (id: string) =>
    set(x => ({ ...x, resources: x.resources.filter(r => r.id !== id) }));

  const addEvent = useCallback(() => {
    const { title, date, location, description } = s.event;
    if (!title.trim() || !date.trim()) return;
    set(x => ({
      ...x,
      events: [
        ...x.events,
        {
          id: String(Date.now()),
          title: title.trim(),
          date: date.trim(),
          location: location.trim(),
          description: description.trim(),
        },
      ],
      event: { title: '', date: '', location: '', description: '' },
    }));
  }, [s.event]);

  const removeEvent = (id: string) =>
    set(x => ({ ...x, events: x.events.filter(e => e.id !== id) }));

  const addHashtag = useCallback(() => {
    const tag = (s.tag.startsWith('#') ? s.tag : `#${s.tag}`).trim();
    if (!tag || s.hashtags.includes(tag)) return;
    set(x => ({
      ...x,
      hashtags: [...x.hashtags, tag],
      tag: '',
    }));
  }, [s.tag, s.hashtags]);

  const removeHashtag = (t: string) =>
    set(x => ({ ...x, hashtags: x.hashtags.filter(xTag => xTag !== t) }));

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

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        Faculty Dashboard
      </Text>
      <Text
        style={{
          color: COLORS.muted,
          textAlign: 'center',
          marginTop: SPACING.xs,
          marginBottom: SPACING.lg,
        }}
      >
        Access resources, submit events, and manage hashtags.
      </Text>

      {/* RESOURCES SECTION */}
      <Section title="Resources">
        <View style={styles.row}>
          <Input
            placeholder="Resource title"
            value={s.resource.title}
            onChangeText={(v: string) => merge('resource')({ title: v })}
            style={styles.flex}
          />
          <Input
            placeholder="https://link"
            value={s.resource.url}
            onChangeText={(v: string) => merge('resource')({ url: v })}
            autoCapitalize="none"
            keyboardType="url"
            style={styles.flex}
          />
        </View>
        <Button label="Add Resource" onPress={addResource} />
        {s.resources.map(r => (
          <View key={r.id} style={[styles.listRow, styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>{r.title}</Text>
              <Text style={styles.link} numberOfLines={1}>{r.url}</Text>
            </View>
            <TouchableOpacity onPress={() => removeResource(r.id)} style={styles.chipX}>
              <Text style={styles.chipXText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Section>

      {/* EVENTS SECTION */}
      <Section title="Enter Event">
        {[{ p: 'Event title', k: 'title' },
          { p: 'Date & time (e.g., 2025-11-20 15:00)', k: 'date' },
          { p: 'Location (optional)', k: 'location' }].map(f => (
          <Input
            key={f.k}
            placeholder={f.p}
            value={(s.event as any)[f.k]}
            onChangeText={(v: string) => merge('event')({ [f.k]: v } as any)}
          />
        ))}
        <Input
          placeholder="Description (optional)"
          value={s.event.description}
          onChangeText={(v: string) => merge('event')({ description: v })}
          multiline
          style={{ minHeight: 80 }}
        />
        <Button label="Add Event" onPress={addEvent} />
        {s.events.length === 0 ? (
          <Text style={styles.emptyText}>No events yet — add one above.</Text>
        ) : (
          s.events.map(e => (
            <View key={e.id} style={[styles.card, styles.row, { justifyContent: 'space-between' }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{e.title}</Text>
                <Text style={styles.dim}>{e.date}</Text>
                {!!e.location && <Text style={styles.dim}>{e.location}</Text>}
                {!!e.description && <Text style={styles.body}>{e.description}</Text>}
              </View>
              <TouchableOpacity onPress={() => removeEvent(e.id)} style={styles.chipX}>
                <Text style={styles.chipXText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </Section>

      {/* HASHTAGS SECTION */}
      <Section title="Hashtags">
        <View style={styles.row}>
          <Input
            placeholder="Add hashtag (e.g., #workshop)"
            value={s.tag}
            onChangeText={(v: string) => on('tag')(v)}
            autoCapitalize="none"
            style={styles.flex}
          />
          <Button small label="Add" onPress={addHashtag} />
        </View>
        <View style={styles.chipsWrap}>
          {s.hashtags.map(tag => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeHashtag(tag)} style={styles.chipX}>
                <Text style={styles.chipXText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Section>
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
const Button: React.FC<{ label: string; onPress: () => void; small?: boolean }> = ({ label, onPress, small }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, small && styles.buttonSm]}>
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

  button: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: 10, alignSelf: 'flex-start' },
  buttonSm: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md },
  buttonText: { color: COLORS.onPrimary, fontWeight: '700' },

  listRow: { paddingVertical: SPACING.sm },
  listTitle: { fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  link: { color: COLORS.primary },
  body: { color: COLORS.text },
  dim: { color: COLORS.text, opacity: 0.7 },

  card: { backgroundColor: COLORS.surface, borderRadius: 10, padding: SPACING.md, marginTop: SPACING.sm },
  row: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  flex: { flex: 1 },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 999 },
  chipText: { color: COLORS.text },
  chipX: { marginLeft: 6 },
  chipXText: { color: COLORS.text, opacity: 0.7, fontSize: 18, lineHeight: 18 },

  emptyText: {
    color: COLORS.text,
    opacity: 0.6,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: SPACING.sm,
  },
});
