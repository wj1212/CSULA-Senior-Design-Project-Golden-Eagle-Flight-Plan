import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { COLORS } from "../constants/colors";
import { SPACING } from "../constants/spacing";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Footer } from "../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<RootStackParamList, "RegLogin">;

/**
 * Reusable login form content
 */
const RegLoginContent = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleBack,
  loading,
  error,
}: {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  handleLogin: () => void;
  handleBack: () => void;
  loading: boolean;
  error: string | null;
}) => (
  <ImageBackground
    source={require("../../../assets/wallpaper-a.jpg")}
    style={styles.contentBackground}
    resizeMode="contain"
  >
    <SafeAreaView style={styles.safeArea} edges={["right", "bottom", "left"]}>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

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
            style={[styles.button, styles.backButton]}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  </ImageBackground>
);

export default function RegLogin() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email.trim().toLowerCase(), password);
      if (result.success) {
        navigation.replace("Main");
      } else {
        setError(result.error || "Login failed. Please check your credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
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

  const contentProps = {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleBack,
    loading,
    error,
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <ImageBackground
          source={require("../../../assets/wallpaper-a.jpg")}
          style={styles.blurredBackground}
          resizeMode="cover"
          blurRadius={15}
        />
        <View style={styles.webMainContent}>
          <RegLoginContent {...contentProps} />
        </View>
      </View>
    );
  }

  return <RegLoginContent {...contentProps} />;
}

const styles = StyleSheet.create({
  // Web-specific
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  blurredBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  webMainContent: {
    width: "100%",
    height: "100%",
    maxWidth: 600,
    maxHeight: 900,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 24,
  },
  // Shared
  safeArea: { flex: 1 },
  contentBackground: { flex: 1, width: "100%", height: "100%" },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingBottom: Platform.OS === "web" ? 180 : 220,
  },
  card: {
    width: "90%",
    maxWidth: 560,
    backgroundColor: "#FAF9F6",
    borderRadius: 24,
    padding: SPACING.xl,
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: SPACING.xl,
    color: COLORS.text,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.buttonPrimaryBackground,
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    marginTop: SPACING.md,
    width: "100%",
    alignItems: "center",
    minHeight: 52,
    justifyContent: "center",
  },
  backButton: { backgroundColor: "#6c757d" },
  buttonText: {
    color: COLORS.buttonPrimaryText,
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  errorText: { color: "red", textAlign: "center", marginBottom: SPACING.md },
});
