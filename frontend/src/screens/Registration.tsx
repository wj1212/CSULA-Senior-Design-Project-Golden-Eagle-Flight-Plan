import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import type { RootStackParamList } from "../../App";

type Nav = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function Registration() {
  const navigation = useNavigation<Nav>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // No back stack (because you used replace) → hard return to Login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  const handleRegister = () => {
    // your registration logic
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Your Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Repeat your password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center",
    padding: SPACING.xl, backgroundColor: COLORS.background,
  },
  backButton: { position: "absolute", top: 50, left: 20, padding: 10 },
  backButtonText: { fontSize: 16, color: COLORS.text },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: SPACING.xxxl, color: COLORS.text },
  input: {
    width: "100%", height: 50, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: SPACING.sm, paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg, backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.buttonPrimaryBackground, paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl, borderRadius: SPACING.sm, marginTop: SPACING.md,
    width: "100%", alignItems: "center",
  },
  buttonText: { color: COLORS.buttonPrimaryText, fontWeight: "bold", fontSize: 16 },
});
