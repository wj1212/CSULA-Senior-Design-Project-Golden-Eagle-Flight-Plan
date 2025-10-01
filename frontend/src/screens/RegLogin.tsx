import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
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
import { Footer } from '../components/Footer';
import { SafeAreaView } from "react-native-safe-area-context";

type Nav = NativeStackNavigationProp<RootStackParamList, "RegLogin">;

export default function RegLogin() {
    const { height } = useWindowDimensions();
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
        btn: {
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
        btnText: {
            fontSize: 17,
            fontWeight: '600',
            color: COLORS.buttonPrimaryText,
        },
        buttonDisabled: {
            opacity: 0.6,
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

    const formContent = (
        <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
            <View style={styles.screen}>
                <View style={styles.card}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>
                        Enter your account details below.
                    </Text>
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
                    <TouchableOpacity
                        style={[styles.btn, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        accessibilityRole="button"
                    >
                        <Text style={styles.btnText}>
                            {loading ? "Signing In..." : "Login"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleBack}
                        accessibilityRole="button"
                    >
                        <Text style={styles.btnText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <Footer />
            </View>
        </SafeAreaView>
    );

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
                    {formContent}
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
            {formContent}
        </ImageBackground>
    );
}