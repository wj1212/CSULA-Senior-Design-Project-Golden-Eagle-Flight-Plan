import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, logout, refreshProfile, updateProfile } = useAuth();

  // Notifications (populated from user on mount)
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifMilestones, setNotifMilestones] = useState(true);

  // Change password form
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  // Populate toggles from user object
  useEffect(() => {
    if (user) {
      setNotifEvents((user as any).notificationPrefs?.events ?? true);
      setNotifMilestones((user as any).notificationPrefs?.scoreboardMilestones ?? true);
    }
  }, [user]);

  const saveToggle = async (patch: Record<string, any>) => {
    await updateProfile(patch);
    await refreshProfile();
  };

  const handleNotifEventsToggle = (val: boolean) => {
    setNotifEvents(val);
    saveToggle({ notificationPrefs: { events: val, scoreboardMilestones: notifMilestones } });
  };

  const handleNotifMilestonesToggle = (val: boolean) => {
    setNotifMilestones(val);
    saveToggle({ notificationPrefs: { events: notifEvents, scoreboardMilestones: val } });
  };

  const handleChangePassword = async () => {
    setPwError('');
    if (!currentPw || !newPw || !confirmPw) {
      setPwError('All fields are required.');
      return;
    }
    if (newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwError('New passwords do not match.');
      return;
    }
    setPwSaving(true);
    const result = await authService.changePassword(currentPw, newPw);
    setPwSaving(false);
    if (result.success) {
      setPwSuccess(true);
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      setTimeout(() => {
        setPwSuccess(false);
        setChangePwVisible(false);
      }, 2000);
    } else {
      setPwError(result.error ?? 'Failed to change password.');
    }
  };

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Settings</Text>

        {/* ── Account ────────────────────────────────── */}
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.group}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              setChangePwVisible((v) => !v);
              setPwError('');
              setPwSuccess(false);
            }}
          >
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Change Password</Text>
            <Ionicons
              name={changePwVisible ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={COLORS.muted}
            />
          </TouchableOpacity>

          {changePwVisible && (
            <View style={styles.pwForm}>
              <TextInput
                style={styles.input}
                placeholder="Current password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={currentPw}
                onChangeText={setCurrentPw}
              />
              <TextInput
                style={styles.input}
                placeholder="New password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={newPw}
                onChangeText={setNewPw}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={confirmPw}
                onChangeText={setConfirmPw}
              />
              {pwError ? <Text style={styles.pwError}>{pwError}</Text> : null}
              {pwSuccess ? (
                <Text style={styles.pwSuccess}>Password changed successfully!</Text>
              ) : null}
              <TouchableOpacity
                style={[styles.pwButton, pwSaving && styles.pwButtonDisabled]}
                onPress={handleChangePassword}
                disabled={pwSaving}
              >
                {pwSaving ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <Text style={styles.pwButtonText}>Save Password</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── Notifications ──────────────────────────── */}
        <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <View style={styles.rowTextBlock}>
              <Text style={styles.rowLabel}>New Events</Text>
              <Text style={styles.rowSub}>Get notified when new events are posted</Text>
            </View>
            <Switch
              value={notifEvents}
              onValueChange={handleNotifEventsToggle}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="trophy-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <View style={styles.rowTextBlock}>
              <Text style={styles.rowLabel}>Scoreboard Milestones</Text>
              <Text style={styles.rowSub}>Get notified when you reach a new level</Text>
            </View>
            <Switch
              value={notifMilestones}
              onValueChange={handleNotifMilestonesToggle}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* ── About ──────────────────────────────────── */}
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <Ionicons name="school-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>App</Text>
            <Text style={styles.rowValue}>Golden Eagle Flight Plan</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color={COLORS.text} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Institution</Text>
            <Text style={styles.rowValue}>Cal State LA</Text>
          </View>
        </View>

        {/* ── Sign Out ───────────────────────────────── */}
        <View style={[styles.group, styles.signOutGroup]}>
          <TouchableOpacity style={styles.row} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#dc2626" style={styles.rowIcon} />
            <Text style={[styles.rowLabel, styles.signOutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  group: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutGroup: {
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 52,
  },
  rowIcon: {
    marginRight: SPACING.md,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },
  rowSub: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  rowTextBlock: {
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    color: COLORS.muted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.lg + 20 + SPACING.md, // align with text after icon
  },
  signOutText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  // Change password form
  pwForm: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    color: COLORS.text,
  },
  pwError: {
    fontSize: 13,
    color: '#dc2626',
  },
  pwSuccess: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '600',
  },
  pwButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  pwButtonDisabled: {
    opacity: 0.6,
  },
  pwButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
});
