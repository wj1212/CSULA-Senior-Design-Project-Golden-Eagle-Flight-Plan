import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginPage from '../frontend/src/screens/LoginPage';
import Registration from '../frontend/src/screens/Registration';
import { BottomTabNavigator } from '../frontend/src/navigation/BottomTabNavigator';
import RegLogin from '../frontend/src/screens/RegLogin';
import ProfileScreen from '../frontend/src/screens/ProfileScreen'; // ✅ add this

// to define the stack's routes
export type RootStackParamList = {
  Login: undefined;
  RegLogin: undefined;
  Register: undefined;
  Main: undefined;
  Profile: undefined; // ✅ add this
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="RegLogin" component={RegLogin} />
          <Stack.Screen name="Register" component={Registration} />
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          
          {/* ✅ Register ProfileScreen */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: true, title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
