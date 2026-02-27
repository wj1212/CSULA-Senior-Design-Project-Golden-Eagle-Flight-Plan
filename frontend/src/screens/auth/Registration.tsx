// src/screens/auth/Registration.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { Footer } from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function Registration() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<Nav>();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "faculty" | "student-organization">("student");
  // Inline error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("Name is required");
      Alert.alert("Error", "Please enter your name");
      valid = false;
    } else setNameError("");

    // Email validation
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      setEmailError("Email is required");
      Alert.alert("Error", "Please enter your email");
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Invalid email address");
      Alert.alert("Error", "Please enter a valid email address");
      valid = false;
    } else setEmailError("");

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      Alert.alert("Error", "Please enter a password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      Alert.alert("Error", "Password must be at least 6 characters");
      valid = false;
    } else setPasswordError("");

    // Confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      Alert.alert("Error", "Passwords do not match");
      valid = false;
    } else setConfirmPasswordError("");

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // Map role to userType
      let userType = "Student";
      if (role === "faculty") userType = "Faculty";
      if (role === "student-organization") userType = "Student Organization";

      const result = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        userType,
      });

      if (result.success) {
        Alert.alert("Success", "Account created! Please log in.");
        navigation.replace("RegLogin");
      } else {
        setEmailError(result.error || "Registration failed");
        Alert.alert("Error", result.error || "Registration failed");
      }
    } catch {
      setEmailError("Unexpected error occurred");
      Alert.alert("Error", "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeArea: { flex: 1 },
        backgroundImage: { flex: 1, width: "100%", height: "100%" },
        backgroundImageInner: { resizeMode: "cover" },
        screen: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingBottom: Platform.OS === "web" ? 180 : height * 0.15,
        },
        card: {
          width: "90%",
          maxWidth: 560,
          backgroundColor: "#FAF9F6",
          borderRadius: 24,
          paddingVertical: 15,
          paddingHorizontal: 24,
          ...Platform.select({
            ios: {
              shadowColor: COLORS.black,
              shadowOpacity: 0.12,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 20,
            },
            android: { elevation: 8 },
            web: {
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
              borderColor: "#EFEFEF",
            },
          }),
        },
        title: {
          fontSize: 28,
          fontWeight: "700",
          color: COLORS.text,
          textAlign: "center",
          marginBottom: 8,
        },
        subtitle: {
          fontSize: 15,
          color: "#5b6670",
          textAlign: "center",
          marginBottom: 15,
        },
        roleRow: { flexDirection: "row", marginBottom: SPACING.lg },
        roleButton: {
          flex: 1,
          alignItems: "center",
          paddingVertical: 6,
          borderWidth: 1.5,
          borderColor: COLORS.border,
          borderRadius: 12,
          backgroundColor: "transparent",
          marginHorizontal: SPACING.sm,
        },
        roleButtonActive: {
          backgroundColor: COLORS.buttonPrimaryBackground,
          borderColor: COLORS.buttonPrimaryBackground,
        },
        roleText: { color: COLORS.text, fontWeight: "600", fontSize: 15 },
        roleTextActive: { color: COLORS.buttonPrimaryText },
        input: {
          width: "100%",
          height: 48,
          backgroundColor: "#FFF",
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 12,
          paddingHorizontal: SPACING.lg,
          marginBottom: 10,
          fontSize: 16,
          color: COLORS.text,
        },
        errorText: {
          color: "red",
          fontSize: 13,
          marginBottom: 8,
        },
        btn: {
          minHeight: 48,
          borderRadius: 12,
          paddingHorizontal: 20,
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.buttonPrimaryBackground,
          ...Platform.select({
            ios: {
              shadowColor: COLORS.black,
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
            },
            android: { elevation: 3 },
          }),
        },
        btnText: {
          fontSize: 16,
          fontWeight: "600",
          color: COLORS.buttonPrimaryText,
        },
        buttonDisabled: { opacity: 0.6 },
        webContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        },
        blurredBackground: { position: "absolute", width: "100%", height: "100%" },
      }),
    [height]
  );

  const formContent = (
    <SafeAreaView style={styles.safeArea} edges={["right", "bottom", "left"]}>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create your new account.</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "student" && styles.roleButtonActive,
              ]}
              onPress={() => setRole("student")}
            >
              <Text
                style={[styles.roleText, role === "student" && styles.roleTextActive]}
              >
                Student
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "faculty" && styles.roleButtonActive,
              ]}
              onPress={() => setRole("faculty")}
            >
              <Text
                style={[styles.roleText, role === "faculty" && styles.roleTextActive]}
              >
                Faculty
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "student-organization" && styles.roleButtonActive,
              ]}
              onPress={() => setRole("student-organization")}
            >
              <Text
                style={[styles.roleText, role === "student-organization" && styles.roleTextActive]}
              >
                Organization
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Repeat your password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          <TouchableOpacity
            style={[styles.btn, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
            accessibilityRole="button"
          >
            <Text style={styles.btnText}>
              {loading ? "Creating Account..." : "Register"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleBack}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <ImageBackground
          source={require("../../../../assets/wallpaper-a.jpg")}
          style={styles.blurredBackground}
          resizeMode="cover"
          blurRadius={15}
        />
        <ImageBackground
          source={require("../../../../assets/wallpaper-a.jpg")}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageInner}
          resizeMode="contain"
        >
          {formContent}
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../../assets/wallpaper-a.jpg")}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageInner}
      resizeMode="cover"
    >
      {formContent}
    </ImageBackground>
  );
}
