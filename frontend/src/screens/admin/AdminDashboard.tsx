// src/screens/admin/AdminDashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import authService from '../../services/authService';

const AdminDashboard: React.FC = () => {
  const [pending, setPending] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadPending = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await authService.getPendingFaculty();
      if (resp.success) {
        setPending(resp.pending);
      } else {
        setError(resp.error || 'Unable to load pending accounts');
      }
    } catch (e: any) {
      setError('Failed to load pending accounts');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (id: string) => {
    setLoading(true);
    const resp = await authService.approveFaculty(id);
    if (resp.success) {
      loadPending();
    } else {
      Alert.alert('Error', resp.error || 'Could not approve');
    }
    setLoading(false);
  };

  const handleDeny = async (id: string) => {
    setLoading(true);
    const resp = await authService.denyFaculty(id);
    if (resp.success) {
      loadPending();
    } else {
      Alert.alert('Error', resp.error || 'Could not deny');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage pending faculty accounts</Text>
        </View>

        {/* Loading State */}
        {loading && pending.length === 0 ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading pending accounts...</Text>
          </View>
        ) : pending.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>All Clear</Text>
            <Text style={styles.emptyText}>No pending faculty accounts to review.</Text>
          </View>
        ) : (
          /* List of Pending Accounts */
          <View>
            <Text style={styles.sectionTitle}>Pending Faculty Accounts ({pending.length})</Text>
            <View style={styles.listContainer}>
              {pending.map((u, idx) => (
                <View key={u._id}>
                  <View style={styles.accountCard}>
                    <View style={styles.cardContent}>
                      <Text style={styles.accountName}>{u.name}</Text>
                      <Text style={styles.accountEmail}>{u.email}</Text>
                      <Text style={styles.accountStatus}>Status: Pending Review</Text>
                    </View>
                    <View style={styles.cardButtons}>
                      <TouchableOpacity
                        style={[styles.actionBtn, styles.approveBtn]}
                        onPress={() => handleApprove(u._id)}
                        disabled={loading}
                      >
                        <Text style={styles.approveText}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionBtn, styles.denyBtn]}
                        onPress={() => handleDeny(u._id)}
                        disabled={loading}
                      >
                        <Text style={styles.denyText}>Deny</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {idx < pending.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Error Banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  headerSection: {
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xl,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  accountCard: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginRight: SPACING.lg,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  accountEmail: {
    fontSize: 15,
    color: '#666',
    marginBottom: SPACING.sm,
  },
  accountStatus: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  cardButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveBtn: {
    backgroundColor: COLORS.primary,
  },
  approveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  denyBtn: {
    backgroundColor: '#d9534f',
  },
  denyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#d9534f',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 15,
    fontWeight: '600',
  },
});
