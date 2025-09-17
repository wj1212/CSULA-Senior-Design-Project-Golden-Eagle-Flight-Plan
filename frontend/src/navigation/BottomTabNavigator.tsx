import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { OpportunitiesScreen } from '../screens/OpportunitiesScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { NavigationScreens } from '../types';
import { Button, Image } from 'react-native';

const Tab = createBottomTabNavigator<NavigationScreens>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Opportunities':
              iconName = focused ? 'target' : 'target-outline';
              break;
            case 'Courses':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Plan':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'Community':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // 1. Adds "Profile" text to the top left
          headerLeft: () => (
            <Button
              onPress={() => alert('Profile pressed!')}
              title="Profile"
              color="#64748b"
              style={{ marginRight: 15 }}
            />
          ),

          // 2. Adds the logo to the center
          headerTitle: () => (
            <Image
              source={require('../../../assets/logo-a.png')}
              style={{ width: 110, height: 35, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',

          // 3. Adds the Logout button to the top right
          headerRight: () => (
            <Button
              onPress={() => alert('Logout pressed!')}
              title="Logout"
              color="#64748b"
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Opportunities"
        component={OpportunitiesScreen}
      />
      <Tab.Screen
        name="Courses"
        children={() => <PlaceholderScreen title="Course Planning" />}
      />
      <Tab.Screen
        name="Plan"
        children={() => <PlaceholderScreen title="My Flight Plan" />}
      />
      <Tab.Screen
        name="Community"
        children={() => <PlaceholderScreen title="Community" />}
      />
      <Tab.Screen
        name="Settings"
        children={() => <PlaceholderScreen title="Settings" />}
      />
    </Tab.Navigator>
  );
};