import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Detect if running on web
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

// API Base URL (adjust LAN IP for mobile dev)
const API_BASE_URL = __DEV__ 
  ? (isWeb ? 'http://localhost:4000/api' : 'http://192.168.0.147:4000/api') // replace with your PC LAN IP
  : 'https://your-production-backend-url.com/api';

console.log('API_BASE_URL:', API_BASE_URL);

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
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token responses
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.data);
    return response;
  },
  async (error) => {
    console.error('API request failed:', error.message);
    console.error('Error details:', error.response?.data);
    if (error.response?.status === 401) {
      await clearStoredToken();
    }
    return Promise.reject(error);
  }
);

// Auth API service
export const authService = {
  // Register user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      console.log('Sending registration request to:', API_BASE_URL + '/auth/register');
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      if (token) await setStoredToken(token);
      return { success: true, user, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Registration failed',
      };
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Sending login request to:', API_BASE_URL + '/auth/login');
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      if (token) await setStoredToken(token);
      return { success: true, user, token };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed',
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
  updateProfile: async (profileData: {
    gradeLevel?: string;
    major?: string;
    degreeType?: string;
    completedCourses?: string[];
    currentCourses?: string[];
    careerInterests?: string[];
    disabilities?: string[];
    availability?: { day: string; slot: string }[];
  }) => {
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
