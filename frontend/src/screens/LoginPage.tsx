import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../frontend/App';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

type Properties = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginPage({ navigation }: Properties) {
  const [loadingSSO, setLoadingSSO] = useState(false);

  // ——— Header (centered logo, no buttons) ———
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/logo-b.png')}
          style={{ width: 160, height: 51, resizeMode: 'contain' }}
        />
      ),
      headerTitleAlign: 'center',
      headerLeft: () => <View style={{ width: 85 }} />,
      headerRight: () => <View style={{ width: 85 }} />,
      headerStyle: { backgroundColor: COLORS.headerBackground, height: 70 },
      headerShadowVisible: false, // optional: removes iOS bottom hairline
    });
  }, [navigation]);

  // Microsoft login request configuration (kept for later use)
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

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Use your Cal State LA credentials or continue with a regular account.
        </Text>

        {/* Microsoft SSO (kept for later) */}
        {/*
        <ThemedButton
          label={loadingSSO ? 'Connecting…' : 'Login with Microsoft'}
          onPress={async () => {
            setLoadingSSO(true);
            await promptAsync();
          }}
          disabled={!request || loadingSSO}
          leftAddon={
            loadingSSO ? (
              <ActivityIndicator size="small" color={COLORS.buttonPrimaryText} />
            ) : null
          }
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
    </View>
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

const MAX_WIDTH = 640;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 16,
      },
      android: { elevation: 6 },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#5b6670',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  btn: {
    minHeight: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.buttonPrimaryBackground,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.buttonPrimaryText,
  },
  leftAddon: { marginRight: 8 },
});
