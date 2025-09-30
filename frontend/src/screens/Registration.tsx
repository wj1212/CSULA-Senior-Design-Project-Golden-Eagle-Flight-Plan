import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Footer } from '../components/Footer';

type Nav = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function Registration() {
  const navigation = useNavigation<Nav>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
      });

      if (result.success) {
        console.log("Registration successful, navigating to Main");
        navigation.replace("Main");
      } else {
        console.log("Registration failed:", result.error);
        Alert.alert("Error", result.error || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };
  
  const [role, setRole] = useState<"student" | "advisor">("student");
  
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

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

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Register"}
        </Text>
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
  backButton: { position: "absolute", top: 50, left: 20, padding: 10 },
  backButtonText: { fontSize: 16, color: COLORS.text },
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
    backgroundColor: COLORS.buttonPrimaryBackground,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: SPACING.sm,
    marginTop: SPACING.md,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.buttonPrimaryText,
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },

    footerContainer: {
    position: 'absolute', // This makes it stick to the bottom
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: SPACING.xxl, // Give it some space from the edge
  },
  footerDivider: {
    height: 1,
    width: '35%', // Adjust width as needed
    backgroundColor: '#4A4A4A', // A subtle gray color
    marginBottom: SPACING.lg,
  },
  footerLogo: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.white,
    // For the script font, you'd need to install a custom font file
    // For now, a bold style will look good
    fontStyle: 'italic', 
    marginBottom: SPACING.lg,
  },
  copyrightText: {
    fontSize: 12,
    color: '#888888', // A lighter gray for the copyright
  },
});
