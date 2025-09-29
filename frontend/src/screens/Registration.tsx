import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios"
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [role, setRole] = useState<"student" | "advisor">("student");

  const handleRegister = () => {
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      
      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleButton, role === "student" && styles.roleButtonActive]}
          onPress={() => setRole("student")}
        >
          <Text style={[styles.roleText, role === "student" && styles.roleTextActive]}>
            Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "advisor" && styles.roleButtonActive]}
          onPress={() => setRole("advisor")}
        >
          <Text style={[styles.roleText, role === "advisor" && styles.roleTextActive]}>
            Advisor
          </Text>
        </TouchableOpacity>
      </View>
      

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Repeat your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: SPACING.xxxl,
    color: COLORS.text,
  },

 
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SPACING.lg,
  },
  roleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.background,
    marginRight: SPACING.md,
  },
  roleButtonActive: {
    backgroundColor: COLORS.buttonPrimaryBackground,
    borderColor: COLORS.buttonPrimaryBackground,
  },
  roleText: {
    color: COLORS.text,
    fontWeight: "600",
  },
  roleTextActive: {
    color: COLORS.buttonPrimaryText,
  },


  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.buttonPrimaryBackground, // Gold
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: SPACING.sm,
    marginTop: SPACING.md,
    width: "100%",
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.buttonPrimaryText, // Black
    fontWeight: "bold",
    fontSize: 16,
  },
});
