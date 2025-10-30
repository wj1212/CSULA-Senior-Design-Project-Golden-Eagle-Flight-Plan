// src/screens/student/ProfileScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../../App";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";

type Nav = NativeStackNavigationProp<RootStackParamList, "Profile">;

const MAJORS = [
  "Computer Science",
  "Information Systems",
  "Engineering",
  "Business Administration",
  "Psychology",
  "Biology",
  "Nursing",
  "Education",
  "Sociology",
];

const FINANCIAL_STATUSES = [
  "Scholarship Recipient",
  "Financial Aid (FAFSA)",
  "Work-Study",
  "Out-of-Pocket",
  "Other",
];

const GRADE_LEVELS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
];

const COMMUTE_STATUSES = [
  "On-Campus Housing",
  "Off-Campus (Near Campus)",
  "Commuter (Local)",
  "Remote/Online",
];

const CAREER_INTEREST_MAP: Record<string, string[]> = {
  "Computer Science": [
    "Software Engineering",
    "AI / Machine Learning",
    "Cybersecurity",
    "Game Development",
    "Data Science",
    "Research",
  ],
  "Information Systems": [
    "IT Support",
    "Database Administration",
    "Systems Analysis",
    "Project Management",
    "Business Analytics",
  ],
  "Business Administration": [
    "Finance",
    "Marketing",
    "Entrepreneurship",
    "Human Resources",
    "Operations Management",
  ],
  "Engineering": [
    "Mechanical Design",
    "Electrical Systems",
    "Civil Infrastructure",
    "Robotics",
    "Product Development",
  ],
  Psychology: [
    "Clinical Practice",
    "Counseling",
    "Human Resources",
    "Neuroscience",
    "Education",
  ],
  Biology: [
    "Biotechnology",
    "Healthcare",
    "Research",
    "Pharmaceuticals",
    "Environmental Science",
  ],
  default: [
    "Research",
    "Teaching",
    "Consulting",
    "Management",
    "Public Service",
  ],
};

const OSD_OPTIONS = [
  "None",
  "Physical Accessibility Needs",
  "Extended Exam Time",
  "Note-Taking Assistance",
  "Adaptive Technology",
  "Mental Health Support",
];

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const { user, updateProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  // profile data (local form state)
  const [major, setMajor] = useState(user?.major || "");
  const [gpa, setGpa] = useState(user?.gpa?.toString() || "");
  const [financialStatus, setFinancialStatus] = useState(
    // default to an allowed enum value if user value missing
    user?.financialStatus || FINANCIAL_STATUSES[0]
  );
  const [gradeLevel, setGradeLevel] = useState(user?.gradeLevel || "Freshman");
  const [commuteStatus, setCommuteStatus] = useState(
    user?.commuteStatus || COMMUTE_STATUSES[0]
  );
  const [careerInterests, setCareerInterests] = useState<string[]>(
    user?.careerInterests || []
  );
  const [osd, setOsd] = useState<string[]>(user?.osd || []);
  const [credits, setCredits] = useState(
    user?.credits ? user.credits.toString() : ""
  );

  // Keep form in sync with user when user object changes (prefill)
  useEffect(() => {
    if (user) {
      setMajor(user.major || "");
      setGpa(user.gpa !== undefined ? user.gpa.toString() : "");
      setFinancialStatus(user.financialStatus || FINANCIAL_STATUSES[0]);
      setGradeLevel(user.gradeLevel || "Freshman");
      setCommuteStatus(user.commuteStatus || COMMUTE_STATUSES[0]);
      setCareerInterests(user.careerInterests || []);
      setOsd(user.osd || []);
      setCredits(user.credits ? user.credits.toString() : "");
    }
  }, [user]);

  const toggleMulti = (setter: any, state: string[], value: string) => {
    setter(
      state.includes(value) ? state.filter((v) => v !== value) : [...state, value]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Ensure we send enum-safe values
      const profileData = {
        major,
        gpa: gpa ? parseFloat(gpa) : 0,
        financialStatus,
        gradeLevel,
        commuteStatus,
        careerInterests,
        osd,
        credits: credits ? parseInt(credits, 10) : 0,
      };

      const result = await updateProfile(profileData);

      if (result.success) {
        // Refresh profile from server (ensures userType and all fields are up-to-date)
        await refreshProfile();
        Alert.alert("Success", "Profile updated successfully!");
        // keep user on main app but navigate to Main (safe)
        navigation.replace("Main");
      } else {
        Alert.alert("Error", result.error || "Failed to save profile");
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      setMajor(user.major || "");
      setGpa(user.gpa?.toString() || "");
      setFinancialStatus(user.financialStatus || FINANCIAL_STATUSES[0]);
      setGradeLevel(user.gradeLevel || "Freshman");
      setCommuteStatus(user.commuteStatus || COMMUTE_STATUSES[0]);
      setCareerInterests(user.careerInterests || []);
      setOsd(user.osd || []);
      setCredits(user.credits ? user.credits.toString() : "");
    }
  };

  const availableCareerInterests =
    CAREER_INTEREST_MAP[major] || CAREER_INTEREST_MAP.default;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Profile</Text>

        {/* Major */}
        <Text style={styles.label}>Major</Text>
        <Dropdown
          style={styles.dropdown}
          data={MAJORS.map((m) => ({ label: m, value: m }))}
          labelField="label"
          valueField="value"
          value={major}
          onChange={(item) => setMajor(item.value)}
          placeholder="Select major"
        />

        {/* GPA */}
        <Text style={styles.label}>GPA</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={gpa}
          onChangeText={setGpa}
          placeholder="Enter GPA (e.g. 3.75)"
        />

        {/* Grade Level */}
        <Text style={styles.label}>Academic Level</Text>
        <Dropdown
          style={styles.dropdown}
          data={GRADE_LEVELS.map((a) => ({ label: a, value: a }))}
          labelField="label"
          valueField="value"
          value={gradeLevel}
          onChange={(item) => setGradeLevel(item.value)}
          placeholder="Select grade level"
        />

        {/* Financial Status */}
        <Text style={styles.label}>Financial Status</Text>
        <Dropdown
          style={styles.dropdown}
          data={FINANCIAL_STATUSES.map((f) => ({ label: f, value: f }))}
          labelField="label"
          valueField="value"
          value={financialStatus}
          onChange={(item) => setFinancialStatus(item.value)}
          placeholder="Select financial status"
        />

        {/* Commute Status */}
        <Text style={styles.label}>Commute Status</Text>
        <Dropdown
          style={styles.dropdown}
          data={COMMUTE_STATUSES.map((c) => ({ label: c, value: c }))}
          labelField="label"
          valueField="value"
          value={commuteStatus}
          onChange={(item) => setCommuteStatus(item.value)}
          placeholder="Select commute status"
        />

        {/* Career Interests */}
        <Text style={styles.label}>Career Interests</Text>
        <View style={styles.chipContainer}>
          {availableCareerInterests.map((area) => {
            const selected = careerInterests.includes(area);
            return (
              <TouchableOpacity
                key={area}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() =>
                  toggleMulti(setCareerInterests, careerInterests, area)
                }
              >
                <Text
                  style={[styles.chipText, selected && styles.chipTextSelected]}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* OSD */}
        <Text style={styles.label}>Accessibility / OSD</Text>
        <View style={styles.checkboxRow}>
          {OSD_OPTIONS.map((item) => {
            const checked = osd.includes(item);
            return (
              <View key={item} style={styles.checkboxContainer}>
                <Checkbox
                  value={checked}
                  onValueChange={() => toggleMulti(setOsd, osd, item)}
                  color={checked ? COLORS.primary : undefined}
                />
                <Text style={styles.checkboxLabel}>{item}</Text>
              </View>
            );
          })}
        </View>

        {/* Credits */}
        <Text style={styles.label}>Credits Earned</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={credits}
          onChangeText={setCredits}
          placeholder="Enter total credits"
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.discard]}
            onPress={handleDiscard}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.save, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.saveText]}>
              {loading ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { padding: SPACING.lg },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.md,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: "#fff",
    marginBottom: SPACING.md,
    height: 50,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING.md,
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    margin: SPACING.xs,
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: { fontSize: 14, color: COLORS.text },
  chipTextSelected: { color: "#000", fontWeight: "600" },
  checkboxRow: { flexDirection: "column", marginBottom: SPACING.md },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  checkboxLabel: { marginLeft: SPACING.sm, fontSize: 14, color: COLORS.text },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.xl,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: SPACING.sm,
  },
  save: { backgroundColor: COLORS.primary },
  discard: { backgroundColor: "#ddd" },
  buttonText: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  saveText: { color: "#000" },
  buttonDisabled: { opacity: 0.6 },
});
