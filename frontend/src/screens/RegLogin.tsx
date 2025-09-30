import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Footer } from '../components/Footer';
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<RootStackParamList, "RegLogin">;

export default function RegLogin() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email.trim().toLowerCase(), password);

      if (result.success) {
        console.log("Login successful, navigating to Main");
        navigation.replace("Main");
      } else {
        console.log("Login failed:", result.error);
        Alert.alert("Error", result.error || "Login failed");
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing In..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button]} 
          onPress={handleBack}
        >
          <Text style={[styles.buttonText]}>
            Back
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.text,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: SPACING.xxxl,
    color: COLORS.text,
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
});
