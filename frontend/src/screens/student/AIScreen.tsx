import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

// ─── Static chat history shown as a preview ───────────────────────────────────
const MOCK_MESSAGES = [
  {
    id: '1',
    role: 'assistant' as const,
    text: "Hi! I'm your Golden Eagle AI Advisor. I can help you with course planning, internship tips, career guidance, and more. What would you like to explore today?",
  },
  {
    id: '2',
    role: 'user' as const,
    text: "What internships should I apply to as a junior in Computer Science?",
  },
  {
    id: '3',
    role: 'assistant' as const,
    text: "Great question! As a CS junior, here are some high-impact opportunities to target:\n\n• **Summer SWE Internships** — Apply to Google, Microsoft, Amazon, and Meta between September–December for the following summer.\n\n• **CSULA-specific programs** — Check Handshake for local LA tech companies that actively recruit from our campus.\n\n• **Research positions** — Talk to your professors about undergraduate research assistant roles — great for grad school and resumé depth.\n\nMake sure your resumé highlights any personal projects and GitHub contributions. Want me to review your resumé?",
  },
  {
    id: '4',
    role: 'user' as const,
    text: "How do I improve my GPA before graduation?",
  },
  {
    id: '5',
    role: 'assistant' as const,
    text: "Here are some evidence-backed strategies:\n\n1. **Office hours** — Professors notice students who attend. It often influences borderline grades.\n\n2. **Study groups** — CS concepts click faster when explained peer-to-peer.\n\n3. **Retake strategic courses** — Some programs allow grade forgiveness. Check with your advisor.\n\n4. **Load management** — Taking 16+ units while working can hurt performance. Consider a lighter semester if possible.\n\nWould you like me to help you map out a study plan for your current courses?",
  },
];

// ─── Static resume feedback shown as a preview ────────────────────────────────
const MOCK_RESUME_FEEDBACK = {
  score: 78,
  summary:
    "Your resumé has a strong technical foundation and good project variety. The main opportunities are around quantifying your impact and adding keywords that match your target roles.",
  strengths: [
    "Clear skills section with relevant technologies (Python, React, SQL)",
    "3 personal projects with GitHub links — shows initiative",
    "Education section is well-formatted with GPA and expected graduation",
  ],
  improvements: [
    "Add metrics to your bullet points (e.g., 'reduced load time by 40%' instead of 'improved performance')",
    "Work experience descriptions are too brief — expand with what you built and why it mattered",
    "Missing a professional summary at the top that ties your profile to your target role",
  ],
  missingKeywords: ['REST APIs', 'Agile', 'CI/CD', 'Unit Testing', 'TypeScript'],
};

type Tab = 'chat' | 'resume';

export const AIScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [chatInput, setChatInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    Alert.alert(
      'Coming Soon',
      'The AI Advisor is under development. This feature will be fully functional in a future update!',
      [{ text: 'Got it', onPress: () => setChatInput('') }]
    );
  };

  const handleUploadResume = () => {
    Alert.alert(
      'Coming Soon',
      'AI Resume Grading is under development. This feature will be fully functional in a future update!',
      [{ text: 'Got it' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.aiIconBadge}>
            <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Features</Text>
            <Text style={styles.headerSub}>Powered by Golden Eagle AI</Text>
          </View>
        </View>
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
      </View>

      {/* Sub-tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 'chat' && styles.subTabActive]}
          onPress={() => setActiveTab('chat')}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={16}
            color={activeTab === 'chat' ? COLORS.primary : COLORS.muted}
          />
          <Text style={[styles.subTabText, activeTab === 'chat' && styles.subTabTextActive]}>
            AI Advisor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 'resume' && styles.subTabActive]}
          onPress={() => setActiveTab('resume')}
        >
          <Ionicons
            name="document-text-outline"
            size={16}
            color={activeTab === 'resume' ? COLORS.primary : COLORS.muted}
          />
          <Text style={[styles.subTabText, activeTab === 'resume' && styles.subTabTextActive]}>
            Resume Grader
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── AI CHAT TAB ────────────────────────────────────────────────────────── */}
      {activeTab === 'chat' && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <View style={styles.previewBanner}>
            <Ionicons name="information-circle-outline" size={15} color={COLORS.secondary} />
            <Text style={styles.previewBannerText}>
              Preview — responses shown are examples of what the AI will provide
            </Text>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatContent}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {MOCK_MESSAGES.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {msg.role === 'assistant' && (
                  <View style={styles.aiAvatarSmall}>
                    <Ionicons name="sparkles" size={12} color={COLORS.primary} />
                  </View>
                )}
                <View style={[styles.bubbleContent, msg.role === 'user' ? styles.userBubbleContent : styles.aiBubbleContent]}>
                  <Text style={[styles.bubbleText, msg.role === 'user' && styles.userBubbleText]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.typingIndicator}>
              <View style={styles.aiAvatarSmall}>
                <Ionicons name="sparkles" size={12} color={COLORS.primary} />
              </View>
              <View style={styles.typingDots}>
                <Text style={styles.typingText}>Ask me anything about your academics or career...</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask the AI Advisor..."
              placeholderTextColor={COLORS.muted}
              value={chatInput}
              onChangeText={setChatInput}
              multiline
              maxLength={500}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              style={[styles.sendBtn, !chatInput.trim() && styles.sendBtnDisabled]}
              onPress={handleSend}
            >
              <Ionicons name="send" size={18} color={chatInput.trim() ? COLORS.onPrimary : COLORS.muted} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* ── RESUME GRADER TAB ──────────────────────────────────────────────────── */}
      {activeTab === 'resume' && (
        <ScrollView style={styles.resumeScroll} contentContainerStyle={styles.resumeContent}>
          <View style={styles.previewBanner}>
            <Ionicons name="information-circle-outline" size={15} color={COLORS.secondary} />
            <Text style={styles.previewBannerText}>
              Preview — the feedback below is a sample of what the AI will generate
            </Text>
          </View>

          {/* Upload Area */}
          <TouchableOpacity style={styles.uploadArea} onPress={handleUploadResume} activeOpacity={0.7}>
            <Ionicons name="cloud-upload-outline" size={40} color={COLORS.primary} />
            <Text style={styles.uploadTitle}>Upload Your Resume</Text>
            <Text style={styles.uploadSub}>PDF or DOCX · Max 5MB</Text>
            <View style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Choose File</Text>
            </View>
          </TouchableOpacity>

          {/* Sample Output Label */}
          <View style={styles.sampleLabelRow}>
            <View style={styles.sampleLabelLine} />
            <Text style={styles.sampleLabel}>Sample AI Feedback</Text>
            <View style={styles.sampleLabelLine} />
          </View>

          {/* Score Card */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreNumber}>{MOCK_RESUME_FEEDBACK.score}</Text>
              <Text style={styles.scoreOutOf}>/100</Text>
            </View>
            <View style={styles.scoreRight}>
              <Text style={styles.scoreLabel}>Overall Score</Text>
              <View style={styles.scoreBar}>
                <View style={[styles.scoreBarFill, { width: `${MOCK_RESUME_FEEDBACK.score}%` }]} />
              </View>
              <Text style={styles.scoreSummary} numberOfLines={3}>
                {MOCK_RESUME_FEEDBACK.summary}
              </Text>
            </View>
          </View>

          {/* Strengths */}
          <View style={styles.feedbackSection}>
            <View style={styles.feedbackSectionHeader}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={[styles.feedbackSectionTitle, { color: '#16a34a' }]}>Strengths</Text>
            </View>
            {MOCK_RESUME_FEEDBACK.strengths.map((item, i) => (
              <View key={i} style={styles.feedbackItem}>
                <View style={[styles.feedbackDot, { backgroundColor: '#16a34a' }]} />
                <Text style={styles.feedbackItemText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Areas to Improve */}
          <View style={styles.feedbackSection}>
            <View style={styles.feedbackSectionHeader}>
              <Ionicons name="arrow-up-circle" size={18} color="#d97706" />
              <Text style={[styles.feedbackSectionTitle, { color: '#d97706' }]}>Areas to Improve</Text>
            </View>
            {MOCK_RESUME_FEEDBACK.improvements.map((item, i) => (
              <View key={i} style={styles.feedbackItem}>
                <View style={[styles.feedbackDot, { backgroundColor: '#d97706' }]} />
                <Text style={styles.feedbackItemText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Missing Keywords */}
          <View style={styles.feedbackSection}>
            <View style={styles.feedbackSectionHeader}>
              <Ionicons name="pricetag-outline" size={18} color={COLORS.secondary} />
              <Text style={[styles.feedbackSectionTitle, { color: COLORS.secondary }]}>
                Keywords to Add
              </Text>
            </View>
            <View style={styles.keywordsWrap}>
              {MOCK_RESUME_FEEDBACK.missingKeywords.map((kw, i) => (
                <View key={i} style={styles.keywordChip}>
                  <Text style={styles.keywordChipText}>{kw}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  aiIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.lightPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.muted,
  },
  comingSoonBadge: {
    backgroundColor: COLORS.secondary + '18',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Sub-tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabActive: {
    borderBottomColor: COLORS.primary,
  },
  subTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.muted,
  },
  subTabTextActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Preview Banner
  previewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.secondary + '12',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    margin: SPACING.md,
    borderRadius: 8,
  },
  previewBannerText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.secondary,
    fontStyle: 'italic',
  },

  // ── Chat styles ─────────────────────────────────────────────────────────────
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  aiBubble: {
    justifyContent: 'flex-start',
  },
  aiAvatarSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.lightPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexShrink: 0,
  },
  bubbleContent: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: SPACING.md,
  },
  aiBubbleContent: {
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  userBubbleContent: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  userBubbleText: {
    color: COLORS.onPrimary,
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  typingDots: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  typingText: {
    fontSize: 13,
    color: COLORS.muted,
    fontStyle: 'italic',
  },

  // Chat Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    color: COLORS.text,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },

  // ── Resume styles ────────────────────────────────────────────────────────────
  resumeScroll: {
    flex: 1,
  },
  resumeContent: {
    padding: SPACING.md,
  },
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    paddingVertical: SPACING.xxxl,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  uploadSub: {
    fontSize: 13,
    color: COLORS.muted,
  },
  uploadBtn: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },

  // Sample divider
  sampleLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sampleLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  sampleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Score Card
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  scoreLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 56,
  },
  scoreOutOf: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.muted,
    marginBottom: 4,
  },
  scoreRight: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoreBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  scoreSummary: {
    fontSize: 12,
    color: COLORS.secondaryText,
    lineHeight: 17,
  },

  // Feedback Sections
  feedbackSection: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  feedbackSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  feedbackDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },
  feedbackItemText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },

  // Keywords
  keywordsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  keywordChip: {
    backgroundColor: COLORS.secondary + '15',
    borderWidth: 1,
    borderColor: COLORS.secondary + '40',
    borderRadius: 14,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  keywordChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondary,
  },
});
