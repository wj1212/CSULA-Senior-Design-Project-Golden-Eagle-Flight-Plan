import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Image, ImageBackground, Dimensions } from 'react-native';
// import * as AuthSession from 'expo-auth-session'; // 🔒 keep for future Microsoft login
import { useAuth } from '../contexts/AuthContext';

// TS type helper from react navigation
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../..//App';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from '../components/Footer';

const { width, height } = Dimensions.get('window');

type Properties = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginPage({ navigation }: Properties) {
  const { user } = useAuth();
  const [loadingSSO, setLoadingSSO] = useState(false);

  // Microsoft login request configuration (⚠️ kept for later use)
  /*
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'your-microsoft-client-id',
      redirectUri: AuthSession.makeRedirectUri(),
      scopes: ['openid', 'profile', 'email'],
      responseType: 'id_token',
    },
    {
      authorizationEndpoint:
        'https://login.microsoftonline.com/calstatela.edu/oauth2/v2.0/authorize',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      setLoadingSSO(false);
      navigation.replace('Register');
    } else if (response?.type === 'error' || response?.type === 'dismiss') {
      setLoadingSSO(false);
    }
  }, [response, navigation]);
  */

  // Redirect to main app if user is already logged in
  useEffect(() => {
    if (user) {
      navigation.replace('Main');
    }
  }, [user, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/wallpaper-a.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageInner}
        resizeMode="cover"
      >
        <View style={styles.screen}>
          <View style={styles.card}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Use your Cal State LA credentials or continue with a regular account.
            </Text>

            {/* Microsoft SSO (⚠️ placeholder for later use) */}
            {/*
            <ThemedButton
              label={loadingSSO ? 'Connecting…' : 'Login with Microsoft'}
              onPress={async () => {
                setLoadingSSO(true);
                await promptAsync();
              }}
              disabled={!request || loadingSSO}
            />
            */}

            {/* Regular login */}
            <ThemedButton
              label="Regular Log in"
              onPress={() => navigation.replace('RegLogin')}
            />

            {/* Create account */}
            <ThemedButton
              label="Create an account"
              onPress={() => navigation.replace('Register')}
            />

            {/* Divider */}
            <View style={styles.divider} />

            {/* Dev shortcut */}
            <ThemedButton
              label="DEV: Quick Access to Main App"
              onPress={() => navigation.replace('Main')}
            />
          </View>
          {/* --- Footer --- */}
          <Footer />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

/** Reusable yellow button component */
function ThemedButton({
  label,
  onPress,
  disabled,
  leftAddon,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  leftAddon?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      hitSlop={8}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        { opacity: disabled ? 0.6 : pressed ? 0.85 : 1 },
      ]}
    >
      {leftAddon ? <View style={styles.leftAddon}>{leftAddon}</View> : null}
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  );
}

const MAX_WIDTH = 560;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.headerBackground,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageInner: {
    resizeMode: 'cover', // Ensures inner image covers without distortion issues
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 150,
  },
  card: {
    width: '90%',
    maxWidth: MAX_WIDTH,
    backgroundColor: '#FAF9F6',
    borderRadius: 24, // Increased for softer, more modern look
    paddingVertical: 20, // Slightly more padding for breathing room
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOpacity: 0.12, // Increased opacity for subtle depth
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
      },
      android: { elevation: 8 }, // Increased elevation for better shadow on Android
    }),
  },
  title: {
    fontSize: 32, // Slightly larger for emphasis
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8, // Added spacing for better flow
  },
  subtitle: {
    fontSize: 15, // Slightly larger for readability
    color: '#5b6670',
    textAlign: 'center',
    marginBottom: 28, // Increased bottom margin for separation
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24, // Slightly more space around divider
  },
  btn: {
    minHeight: 52, // Taller buttons for better touch targets
    borderRadius: 12, // Softer corners
    paddingHorizontal: 20, // More horizontal padding
    marginVertical: 6, // More space between buttons
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.buttonPrimaryBackground,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: { elevation: 3 }, // Add subtle shadow to buttons
    }),
  },
  btnText: {
    fontSize: 17, // Larger text for better readability
    fontWeight: '600',
    color: COLORS.buttonPrimaryText,
  },
  leftAddon: { marginRight: 10 }, // Slightly more space for addons
});