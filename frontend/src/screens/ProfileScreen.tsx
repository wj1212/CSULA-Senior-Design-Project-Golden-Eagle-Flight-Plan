import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";

import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";

// Mock data
const COURSES = ["Math 101", "CS 201", "History 110", "Psych 150"];
const CAREER_AREAS = ["Engineering", "Business", "Healthcare", "Arts"];
const GRADE_LEVELS = ["Freshman", "Sophomore", "Junior", "Senior"];
const MAJORS = [
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Engineering",
  "Biology",
];
const DEGREE_TYPES = ["Bachelor", "Master", "PhD"];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = [
  "8–10am",
  "10–12pm",
  "12–2pm",
  "2–4pm",
  "4–6pm",
  "6–8pm",
];

export default function ProfileScreen() {
  const [gradeLevel, setGradeLevel] = useState("Sophomore");
  const [major, setMajor] = useState("Computer Science");
  const [degreeType, setDegreeType] = useState("Bachelor");

  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [disabilities, setDisabilities] = useState<string[]>([]);
  const [availability, setAvailability] = useState<
    { day: string; slot: string }[]
  >([]);

  const toggleCourse = (course: string) => {
    setCompletedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const toggleCareer = (area: string) => {
    setCareerInterests((prev) =>
      prev.includes(area)
        ? prev.filter((c) => c !== area)
        : [...prev, area]
    );
  };

  const toggleDisability = (item: string) => {
    setDisabilities((prev) =>
      prev.includes(item)
        ? prev.filter((d) => d !== item)
        : [...prev, item]
    );
  };

  const toggleAvailability = (day: string, slot: string) => {
    const key = { day, slot };
    setAvailability((prev) =>
      prev.some((a) => a.day === day && a.slot === slot)
        ? prev.filter((a) => !(a.day === day && a.slot === slot))
        : [...prev, key]
    );
  };

  const handleSave = () => {
    console.log("Saved profile", {
      gradeLevel,
      major,
      degreeType,
      completedCourses,
      careerInterests,
      disabilities,
      availability,
    });
  };

  const handleDiscard = () => {
    setCompletedCourses([]);
    setCareerInterests([]);
    setDisabilities([]);
    setAvailability([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Profile</Text>

        {/* Grade Level */}
        <Text style={styles.label}>Grade Level</Text>
        <Dropdown
          style={styles.dropdown}
          data={GRADE_LEVELS.map((g) => ({ label: g, value: g }))}
          labelField="label"
          valueField="value"
          value={gradeLevel}
          onChange={(item) => setGradeLevel(item.value)}
          placeholder="Select grade level"
        />

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

        {/* Degree Type */}
        <Text style={styles.label}>Degree Type</Text>
        <Dropdown
          style={styles.dropdown}
          data={DEGREE_TYPES.map((d) => ({ label: d, value: d }))}
          labelField="label"
          valueField="value"
          value={degreeType}
          onChange={(item) => setDegreeType(item.value)}
          placeholder="Select degree"
        />

        {/* Completed Courses */}
        <Text style={styles.label}>Completed Courses</Text>
        <View style={styles.chipContainer}>
          {COURSES.map((course) => {
            const selected = completedCourses.includes(course);
            return (
              <TouchableOpacity
                key={course}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleCourse(course)}
              >
                <Text
                  style={[styles.chipText, selected && styles.chipTextSelected]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Career Interests */}
        <Text style={styles.label}>Career Interests</Text>
        <View style={styles.chipContainer}>
          {CAREER_AREAS.map((area) => {
            const selected = careerInterests.includes(area);
            return (
              <TouchableOpacity
                key={area}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleCareer(area)}
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

        {/* Accessibility Needs */}
        <Text style={styles.label}>Accessibility Needs</Text>
        <View style={styles.checkboxRow}>
          {["Wheelchair Access", "Sign Language Interpreter"].map((item) => {
            const checked = disabilities.includes(item);
            return (
              <View key={item} style={styles.checkboxContainer}>
                <Checkbox
                  value={checked}
                  onValueChange={() => toggleDisability(item)}
                  color={checked ? COLORS.primary : undefined}
                />
                <Text style={styles.checkboxLabel}>{item}</Text>
              </View>
            );
          })}
        </View>

        {/* Weekly Availability */}
        <Text style={styles.label}>Weekly Availability</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Header row */}
            <View style={styles.scheduleRow}>
              <View style={[styles.scheduleCell, styles.scheduleHeader]} />
              {DAYS.map((day) => (
                <View
                  key={day}
                  style={[styles.scheduleCell, styles.scheduleHeader]}
                >
                  <Text style={styles.scheduleHeaderText}>{day}</Text>
                </View>
              ))}
            </View>
            {/* Time slot rows */}
            {TIME_SLOTS.map((slot) => (
              <View key={slot} style={styles.scheduleRow}>
                <View style={[styles.scheduleCell, styles.scheduleHeader]}>
                  <Text style={styles.scheduleHeaderText}>{slot}</Text>
                </View>
                {DAYS.map((day) => {
                  const active = availability.some(
                    (a) => a.day === day && a.slot === slot
                  );
                  return (
                    <TouchableOpacity
                      key={day + slot}
                      style={[
                        styles.scheduleCell,
                        active && styles.scheduleActive,
                      ]}
                      onPress={() => toggleAvailability(day, slot)}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Save / Discard Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.discard]}
            onPress={handleDiscard}
          >
            <Text style={styles.buttonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.save]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.saveText]}>Save</Text>
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
  checkboxLabel: {
    marginLeft: SPACING.sm,
    fontSize: 14,
    color: COLORS.text,
  },
  scheduleRow: { flexDirection: "row" },
  scheduleCell: {
    width: 70,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleHeader: { backgroundColor: "#f5f5f5" },
  scheduleHeaderText: { fontSize: 12, fontWeight: "600" },
  scheduleActive: { backgroundColor: COLORS.primary },
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
});
