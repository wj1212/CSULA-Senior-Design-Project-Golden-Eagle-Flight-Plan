// src/services/authService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL — set EXPO_PUBLIC_API_URL in your local .env file.
// See frontend/.env.example for instructions.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

// Detect if running on web (needed for storage helpers below)
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// Storage helpers
export const getStoredToken = async (): Promise<string | null> => {
  try {
    if (isWeb) {
      return localStorage.getItem('authToken');
    } else {
      return await AsyncStorage.getItem('authToken');
    }
  } catch {
    return null;
  }
};

export const setStoredToken = async (token: string): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.setItem('authToken', token);
    } else {
      await AsyncStorage.setItem('authToken', token);
    }
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const clearStoredToken = async (): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.removeItem('authToken');
    } else {
      await AsyncStorage.removeItem('authToken');
    }
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearStoredToken();
    }
    return Promise.reject(error);
  }
);

// Auth API service
const authService = {
  // Register user (do NOT auto-store token here to avoid auto-login)
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    userType?: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      // IMPORTANT: do not automatically persist token on register to avoid auto-login behaviour.
      // If you want to auto-login after register, you'll store token here; but we deliberately do NOT.
      return { success: true, user, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || error.message || 'Registration failed',
      };
    }
  },

  // Login user (store token)
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      if (token) await setStoredToken(token);
      // return user (note: we will verify/fetch profile afterwards in AuthContext to ensure userType present)
      return { success: true, user, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || error.message || 'Login failed',
      };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, user: response.data.user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch profile',
      };
    }
  },

  // Update user profile
  updateProfile: async (profileData: Record<string, any>) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return { success: true, user: response.data.user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update profile',
      };
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return { success: true, user: response.data.user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Token verification failed',
      };
    }
  },

  // Logout
  logout: async () => {
    await clearStoredToken();
    return { success: true };
  },
};

export default authService;
