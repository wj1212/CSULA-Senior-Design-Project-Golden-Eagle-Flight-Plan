// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import authService, { getStoredToken } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  userType?: string;
  status?: string; // for faculty approval status (pending/approved/denied)
  gradeLevel?: string;
  major?: string;
  degreeType?: string;
  gpa?: number;
  completedCourses?: string[];
  currentCourses?: string[];
  careerInterests?: string[];
  disabilities?: string[];
  availability?: { day: string; slot: string }[];
  credits?: number;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    userType?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = 'app_user_v1';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load saved user on startup (token + user)
  useEffect(() => {
    const restore = async () => {
      try {
        const token = await getStoredToken();
        const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else if (token) {
          const result = await authService.verifyToken();
          if (result.success) {
            setUser(result.user);
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
          } else {
            await authService.logout();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth restore error:', err);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  // persist user whenever it changes
  useEffect(() => {
    const persist = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (err) {
        console.error('Failed to persist user', err);
      }
    };
    persist();
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await authService.login({ email, password });
      if (result.success && result.token) {
        // token already stored by authService.login
        // fetch the verified profile so we have userType and all fields immediately
        const profile = await authService.verifyToken();
        if (profile.success && profile.user) {
          setUser(profile.user);
          return { success: true };
        } else {
          // fallback to returned user if profile call failed
          setUser(result.user || null);
          return { success: true };
        }
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    userType?: string;
  }) => {
    try {
      setLoading(true);
      const result = await authService.register(userData);
      if (result.success && result.user) {
        // intentionally do not setUser (no auto-login), we simply return success.
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setLoading(true);
      const result = await authService.updateProfile(profileData);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Profile update failed' };
      }
    } catch (error) {
      console.error('Update profile error', error);
      return { success: false, error: 'Profile update failed' };
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const result = await authService.getProfile();
      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (err) {
      console.error('Refresh profile failed', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
