import axios from 'axios';

// Use localhost for development - Expo will handle the network routing
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:4000/api'
  : 'https://your-production-backend-url.com/api';

console.log('API_BASE_URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Making API request to:', config.url);
  console.log('Request config:', config);
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API request failed:', error.message);
    console.error('Error details:', error.response?.data);
    if (error.response?.status === 401) {
      // Token expired or invalid
      clearStoredToken();
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

// Token management
export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem('authToken');
  } catch {
    return null;
  }
};

export const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const clearStoredToken = (): void => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

// Auth API calls
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
      console.log('Registration data:', { ...userData, password: '[HIDDEN]' });
      
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;
      
      if (token) {
        setStoredToken(token);
      }
      
      return { success: true, user, token };
    } catch (error: any) {
      console.error('Registration API error:', error);
      console.error('Error response:', error.response?.data);
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
      console.log('Login credentials:', { ...credentials, password: '[HIDDEN]' });
      
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      
      const { token, user } = response.data;
      
      if (token) {
        setStoredToken(token);
      }
      
      return { success: true, user, token };
    } catch (error: any) {
      console.error('Login API error:', error);
      console.error('Error response:', error.response?.data);
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
  logout: () => {
    clearStoredToken();
    return { success: true };
  },
};

export default authService;
