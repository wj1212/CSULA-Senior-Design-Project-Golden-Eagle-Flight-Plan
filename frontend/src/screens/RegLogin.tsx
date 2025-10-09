import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Platform,
    useWindowDimensions
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
 * Extracted reusable login form content
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
    styles,
}: {
    email: string;
    setEmail: (text: string) => void;
    password: string;
    setPassword: (text: string) => void;
    handleLogin: () => void;
    handleBack: () => void;
    loading: boolean;
    error: string | null;
    styles: ReturnType<typeof StyleSheet.create>;
}) => (
    <SafeAreaView style={styles.safeArea} edges={["right", "bottom", "left"]}>
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Enter your account details below.</Text>

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
                    style={styles.button}
                    onPress={handleBack}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    </SafeAreaView>
);

export default function RegLogin() {
    const { height } = useWindowDimensions();
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

    const styles = useMemo(() => StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        backgroundImageInner: {
            resizeMode: 'cover',
        },
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingBottom: Platform.OS === 'web' ? 180 : height * 0.22,
        },
        card: {
            width: '90%',
            maxWidth: 560,
            backgroundColor: '#FAF9F6',
            borderRadius: 24,
            paddingVertical: 20,
            paddingHorizontal: 24,
            ...Platform.select({
                ios: {
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.12,
                    shadowOffset: { width: 0, height: 8 },
                    shadowRadius: 20,
                },
                android: {
                    elevation: 8
                },
                web: {
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    borderColor: '#EFEFEF',
                }
            }),
        },
        title: {
            fontSize: 32,
            fontWeight: '700',
            color: COLORS.text,
            textAlign: 'center',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 15,
            color: '#5b6670',
            textAlign: 'center',
            marginBottom: 28,
        },
        input: {
            width: "100%",
            height: 50,
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: 12,
            paddingHorizontal: SPACING.lg,
            marginBottom: SPACING.lg,
            fontSize: 16,
            color: COLORS.text,
        },
        button: {
            minHeight: 52,
            borderRadius: 12,
            paddingHorizontal: 20,
            marginVertical: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.buttonPrimaryBackground,
            ...Platform.select({
                ios: {
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 8,
                },
                android: {
                    elevation: 3
                }
            }),
        },
        buttonText: {
            fontSize: 17,
            fontWeight: '600',
            color: COLORS.buttonPrimaryText,
        },
        buttonDisabled: {
            opacity: 0.6,
        },
        errorText: {
            color: "red",
            textAlign: "center",
            marginBottom: SPACING.md,
        },
        webContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
        },
        blurredBackground: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
    }), [height]);

    const contentProps = {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleBack,
        loading,
        error,
        styles,
    };

    if (Platform.OS === 'web') {
        return (
            <View style={styles.webContainer}>
                <ImageBackground
                    source={require('../../../assets/wallpaper-a.jpg')}
                    style={styles.blurredBackground}
                    resizeMode="cover"
                    blurRadius={15}
                />
                <ImageBackground
                    source={require('../../../assets/wallpaper-a.jpg')}
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImageInner}
                    resizeMode="contain"
                >
                    <RegLoginContent {...contentProps} />
                </ImageBackground>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../../assets/wallpaper-a.jpg')}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageInner}
            resizeMode="cover"
        >
            <RegLoginContent {...contentProps} />
        </ImageBackground>
    );
}