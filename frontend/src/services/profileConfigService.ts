import axios from 'axios';
import { getStoredToken } from './authService';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

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

export type ProfileConfig = {
  _id?: string;
  majors: string[];
  financialStatuses: string[];
  gradeLevels: string[];
  commuteStatuses: string[];
  osdOptions: string[];
  careerInterests: Record<string, string[]>;
  createdAt?: string;
  updatedAt?: string;
};

const profileConfigService = {
  // Fetch all profile configuration options
  getConfig: async () => {
    try {
      const response = await api.get('/profile-config');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch profile configuration',
      };
    }
  },

  // Update profile configuration (Faculty/Admin only)
  updateConfig: async (configUpdates: Partial<ProfileConfig>) => {
    try {
      const response = await api.post('/profile-config', configUpdates);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to update profile configuration',
      };
    }
  },

  // Helper: Add option to a field (e.g., add a major)
  addOption: async (field: keyof Omit<ProfileConfig, '_id' | 'createdAt' | 'updatedAt' | 'careerInterests'>, option: string) => {
    try {
      const configRes = await api.get('/profile-config');
      const currentConfig = configRes.data?.config || {};
      const currentOptions = (currentConfig[field] as string[]) || [];
      
      if (currentOptions.includes(option)) {
        return { success: false, error: 'Option already exists' };
      }

      const updated = await api.post('/profile-config', {
        [field]: [...currentOptions, option],
      });
      return updated.data;
    } catch (error: any) {
      console.error('Error adding option:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to add option',
      };
    }
  },

  // Helper: Remove option from a field
  removeOption: async (field: keyof Omit<ProfileConfig, '_id' | 'createdAt' | 'updatedAt' | 'careerInterests'>, option: string) => {
    try {
      const configRes = await api.get('/profile-config');
      const currentConfig = configRes.data?.config || {};
      const currentOptions = (currentConfig[field] as string[]) || [];
      
      const updated = await api.post('/profile-config', {
        [field]: currentOptions.filter((opt) => opt !== option),
      });
      return updated.data;
    } catch (error: any) {
      console.error('Error removing option:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to remove option',
      };
    }
  },
};

export default profileConfigService;
