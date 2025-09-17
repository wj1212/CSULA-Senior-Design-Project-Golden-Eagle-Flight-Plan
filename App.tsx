import React from 'react';
//manages nav state , back button
import { NavigationContainer } from '@react-navigation/native';
//creates stack nav to navigate between screens 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginPage from './src/screens/LoginPage';
import Registration from './src/screens/Registration';

import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import RegLogin from './src/screens/RegLogin';

// to define the stack's routes
export type RootStackParamList = {
  Login: undefined;
  RegLogin : undefined;
  Register: undefined;
  Main: undefined;
};

//the stack navigator instance, to navigate between screens
// <Navigator> wraps the stack
// <Screen> defines each screen inside the stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="RegLogin" component={RegLogin}/>
          <Stack.Screen name="Register" component={Registration} />
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
