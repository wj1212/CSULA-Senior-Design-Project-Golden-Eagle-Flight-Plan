import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import LoginPage from './src/screens/auth/LoginPage';
import Registration from './src/screens/auth/Registration';
import RegLogin from './src/screens/auth/RegLogin';

import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import ProfileScreen from './src/screens/student/ProfileScreen';

import FacultyDashboard from './src/screens/faculty/FacultyDashboard';
import ProfileConfigurationPage from './src/screens/faculty/ProfileConfigurationPage';
import AdminDashboard from './src/screens/admin/AdminDashboard';

export type RootStackParamList = {
  Login: undefined;
  RegLogin: undefined;
  Register: undefined;
  Main: undefined;
  FacultyDashboard: undefined;
  ProfileConfiguration: undefined;
  AdminDashboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth(); // 👈 get logged-in user info (including userType)

  const authHeaderOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: '#000',
      height: 70 + insets.top,
      marginHorizontal: 20,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    headerTitleAlign: 'center' as const,
    headerShadowVisible: false,
    headerLeft: () => <View style={{ width: 85 }} />,
    headerRight: () => <View style={{ width: 85 }} />,
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/logo-b.png')}
          style={{ width: 150, height: 48, resizeMode: 'contain' }}
        />
      </View>
    ),
  };

  const getInitialRoute = () => {
    if (!user) return 'Login';
    const userType = (user as any).userType;
    if (userType === 'Faculty' || userType === 'Student Organization') return 'FacultyDashboard';
    if (userType === 'Admin') return 'AdminDashboard';
    return 'Main';
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        {/* Auth screens */}
        <Stack.Screen name="Login" component={LoginPage} options={authHeaderOptions} />
        <Stack.Screen name="RegLogin" component={RegLogin} options={authHeaderOptions} />
        <Stack.Screen name="Register" component={Registration} options={authHeaderOptions} />

        {/* Main student app */}
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />

        {/* Faculty / Admin dashboards */}
        <Stack.Screen
          name="FacultyDashboard"
          component={FacultyDashboard}
          options={{ title: user?.userType === 'Student Organization' ? 'Organization Dashboard' : 'Faculty Dashboard' }}
        />
        <Stack.Screen
          name="ProfileConfiguration"
          component={ProfileConfigurationPage}
          options={{ title: 'Student Profile Configuration', headerShown: true }}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />

        {/* Student Profile */}
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
