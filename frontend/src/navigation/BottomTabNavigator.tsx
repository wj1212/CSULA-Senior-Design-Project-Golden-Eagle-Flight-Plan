// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/student/HomeScreen';
import { ScoreboardScreen } from '../screens/student/ScoreboardScreen';
import { ResourcesScreen } from '../screens/student/ResourcesScreen';
import { SettingsScreen } from '../screens/student/SettingsScreen';
import { AIScreen } from '../screens/student/AIScreen';
import { Image, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import FacultyDashboard from '../screens/faculty/FacultyDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';
import StudentProfileViewer from '../screens/faculty/StudentProfileViewer';

type NavParamList = {
  Home: undefined;
  Courses: undefined;
  Plan: undefined;
  Resources: undefined;
  Settings: undefined;
  Profile: undefined;
  FacultyDashboard: undefined;
  AdminDashboard: undefined;
  Students: undefined;
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

  // Faculty ONLY
    if (userType === 'faculty') {
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

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Students') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
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

      <Tab.Screen
        name="Students"
        component={StudentProfileViewer}
        options={{ title: 'Students' }}
      />
    </Tab.Navigator>
  );
}

// Student Organization (NO student tab)
if (userType === 'student organization') {
  return (
    <Tab.Navigator>
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
            case 'Courses':
              iconName = focused ? 'sparkles' : 'sparkles-outline';
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
      <Tab.Screen name="Courses" component={AIScreen} options={{ tabBarLabel: 'AI' }} />
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
