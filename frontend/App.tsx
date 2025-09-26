import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';

import { AuthProvider } from './src/contexts/AuthContext';
import LoginPage from '../frontend/src/screens/LoginPage';
import Registration from '../frontend/src/screens/Registration';
import RegLogin from '../frontend/src/screens/RegLogin';
import { BottomTabNavigator } from '../frontend/src/navigation/BottomTabNavigator';
import ProfileScreen from '../frontend/src/screens/ProfileScreen';

// Route types
export type RootStackParamList = {
  Login: undefined;
  RegLogin: undefined;
  Register: undefined;
  Main: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Reusable header options for auth screens
const authHeaderOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: '#000' },
  headerTitleAlign: 'center' as const,
  headerShadowVisible: false,
  headerLeft: () => <View style={{ width: 85 }} />,
  headerRight: () => <View style={{ width: 85 }} />,
  headerTitle: () => (
    <Image
      source={require('../assets/logo-b.png')}
      style={{ width: 160, height: 51, resizeMode: 'contain' }}
    />
  ),
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator initialRouteName="Login">
            {/* Auth screens */}
            <Stack.Screen name="Login" component={LoginPage} options={authHeaderOptions} />
            <Stack.Screen name="RegLogin" component={RegLogin} options={authHeaderOptions} />
            <Stack.Screen name="Register" component={Registration} options={authHeaderOptions} />

            {/* Main app (tabs) */}
            <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />

            {/* Profile screen */}
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: true, title: 'Profile' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
