// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/student/HomeScreen';
import { OpportunitiesScreen } from '../screens/student/OpportunitiesScreen';
import { PlaceholderScreen } from '../screens/student/PlaceholderScreen';
import { ScoreboardScreen } from '../screens/student/ScoreboardScreen';
import { CoursesScreen } from '../screens/student/CoursesScreen';
import { ResourcesScreen } from '../screens/student/ResourcesScreen';
import { SettingsScreen } from '../screens/student/SettingsScreen';
import { Image, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import FacultyDashboard from '../screens/faculty/FacultyDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';

type NavParamList = {
  Home: undefined;
  Opportunities: undefined;
  Courses: undefined;
  Plan: undefined;
  Resources: undefined;
  Settings: undefined;
  Profile: undefined;
  FacultyDashboard: undefined;
  AdminDashboard: undefined;
};

const Tab = createBottomTabNavigator<NavParamList>();

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  // Normalize userType if available
  const rawType = (user?.userType || user?.type || '').toString();
  const userType = rawType.toLowerCase() || 'student';
  const isFacultyOrOrg = userType === 'faculty' || userType === 'student organization';

  if (isFacultyOrOrg) {
    return (
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          headerTitle: () => (
            <Image
              source={require('../../../assets/logo-b.png')}
              style={{ width: 160, height: 51, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerLeft: () => <View style={styles.placeholder} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                await logout();
                // safe reset to landing
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
              }}
              style={[styles.headerButtonPrimary, { marginRight: SPACING.md }]}
            >
              <Text style={styles.headerButtonPrimaryText}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              default:
                iconName = 'help-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: COLORS.headerBackground,
            height: 70 + insets.top,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: COLORS.headerBackground,
            borderTopWidth: 0,
            paddingTop: SPACING.xs,
            height: 70 + insets.bottom,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.inactive,
        })}
      >
        <Tab.Screen
          name="Home"
          component={FacultyDashboard}
          options={{ title: 'Posting Events' }}
        />
      </Tab.Navigator>
    );
  }

  if (!isFacultyOrOrg && userType === 'admin') {
    return (
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('../../../assets/logo-b.png')}
                style={{ width: 160, height: 51, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => <View style={styles.placeholder} />,
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                await logout();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
              }}
              style={[styles.headerButtonPrimary, { marginRight: SPACING.md }]}
            >
              <Text style={styles.headerButtonPrimaryText}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              default:
                iconName = 'help-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: COLORS.headerBackground,
            height: 70 + insets.top,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: COLORS.headerBackground,
            borderTopWidth: 0,
            paddingTop: SPACING.xs,
            height: 70 + insets.bottom,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.inactive,
        })}
      >
        <Tab.Screen name="Home" component={AdminDashboard} options={{ title: 'Admin' }} />
      </Tab.Navigator>
    );
  }

  // Default: Student UI (full tab set)
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerTitle: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../../../assets/logo-b.png')}
              style={{ width: 160, height: 51, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerLeft: () => <View style={styles.placeholder} />,
        headerRight: () => <View style={styles.placeholder} />,

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
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Resources':
              iconName = focused ? 'library' : 'library-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: {
          backgroundColor: COLORS.headerBackground,
          height: 70 + insets.top,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: COLORS.headerBackground,
          borderTopWidth: 0,
          paddingTop: SPACING.xs,
          height: 70 + insets.bottom,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={[styles.headerButtonPrimary, { marginLeft: SPACING.md }]}
            >
              <Text style={styles.headerButtonPrimaryText}>Profile</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                await logout();
                // navigate back to login landing safely
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                );
              }}
              style={[styles.headerButtonPrimary, { marginRight: SPACING.md }]}
            >
              <Text style={styles.headerButtonPrimaryText}>Logout</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name="Opportunities" component={OpportunitiesScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Plan" component={ScoreboardScreen} options={{ tabBarLabel: 'Scoreboard' }} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    width: 85,
  },
  headerButtonPrimary: {
    backgroundColor: COLORS.buttonPrimaryBackground,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SPACING.sm,
  },
  headerButtonPrimaryText: {
    color: COLORS.buttonPrimaryText,
    fontSize: 14,
    fontWeight: '600',
  },
});
