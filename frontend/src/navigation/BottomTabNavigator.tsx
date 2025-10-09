import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { OpportunitiesScreen } from '../screens/OpportunitiesScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { NavigationScreens } from '../types';
import { Image, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';  // ✅ import auth context

const Tab = createBottomTabNavigator<NavigationScreens>();

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth(); // ✅ get logout function

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
              onPress={() => navigation.navigate("Profile")}
              style={[styles.headerButtonPrimary, { marginLeft: SPACING.md }]}
            >
              <Text style={styles.headerButtonPrimaryText}>Profile</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                logout(); // ✅ clear token + reset user
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
