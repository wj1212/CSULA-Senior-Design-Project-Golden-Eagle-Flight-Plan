import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  ImageBackground,
  useWindowDimensions
} from 'react-native';
// import * as AuthSession from 'expo-auth-session'; // 🔒 keep for future Microsoft login
import { useAuth } from '../contexts/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { COLORS } from '../constants/colors';
import { Footer } from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

type Properties = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginPage({ navigation }: Properties) {
  const { height } = useWindowDimensions();
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

  const styles = useMemo(() => {
    const MAX_WIDTH = 560;
    return StyleSheet.create({
      safeArea: { flex: 1 },
      backgroundImage: { flex: 1, width: '100%', height: '100%' },
      backgroundImageInner: { resizeMode: 'cover' },
      screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        paddingBottom: Platform.OS === 'web' ? 180 : height * 0.25,
      },
      card: {
        width: '90%',
        maxWidth: MAX_WIDTH,
        backgroundColor: '#FAF9F6',
        borderRadius: 24,
        paddingVertical: 20,
        paddingHorizontal: 24,
        ...Platform.select({
          ios: { shadowColor: COLORS.black, shadowOpacity: 0.12, shadowOffset: { width: 0, height: 8 }, shadowRadius: 20 },
          android: { elevation: 8 },
          web: { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)', borderWidth: 1, borderColor: '#EFEFEF' }
        }),
      },
      title: { fontSize: 32, fontWeight: '700', color: COLORS.text, textAlign: 'center', marginBottom: 8 },
      subtitle: { fontSize: 15, color: '#5b6670', textAlign: 'center', marginBottom: 28 },
      divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 24 },
      btn: { minHeight: 52, borderRadius: 12, paddingHorizontal: 20, marginVertical: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: COLORS.buttonPrimaryBackground, ...Platform.select({ ios: { shadowColor: COLORS.black, shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 }, android: { elevation: 3 }, web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' } }) },
      btnText: { fontSize: 17, fontWeight: '600', color: COLORS.buttonPrimaryText },
      leftAddon: { marginRight: 10 },
      webContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
      blurredBackground: { position: 'absolute', width: '100%', height: '100%' },
    });
  }, [height]);

  function ThemedButton({
    label,
    onPress,
    disabled,
  }: {
    label: string;
    onPress: () => void;
    disabled?: boolean;
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
        <Text style={styles.btnText}>{label}</Text>
      </Pressable>
    );
  }

  const loginOptionsContent = (
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
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <ImageBackground source={require('../../../assets/wallpaper-a.jpg')} style={styles.blurredBackground} resizeMode="cover" blurRadius={15} />
        <ImageBackground source={require('../../../assets/wallpaper-a.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImageInner} resizeMode="contain">
          <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
            <View style={styles.screen}>
              {loginOptionsContent}
              <Footer />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../../assets/wallpaper-a.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImageInner} resizeMode="contain">
      <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
        <View style={styles.screen}>
          {loginOptionsContent}
          <Footer />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}