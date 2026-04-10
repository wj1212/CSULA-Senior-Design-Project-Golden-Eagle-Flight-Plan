import axios from 'axios';
import { getStoredToken, clearStoredToken } from './authService';
import {
  ScoreboardProgress,
  CompleteTaskResponse,
  EligibleEvent,
} from '../types';

// API Base URL — set EXPO_PUBLIC_API_URL in your local .env file.
// See frontend/.env.example for instructions.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearStoredToken();
    }
    return Promise.reject(error);
  }
);

const scoreboardService = {
  // GET /api/scoreboard/tasks
  // Optional filters: yearTarget (number), category (string)
  getTasks: async (params?: { yearTarget?: number; category?: string }) => {
    try {
      const response = await api.get('/scoreboard/tasks', { params });
      return { success: true, tasks: response.data.tasks };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch tasks',
      };
    }
  },

  // GET /api/scoreboard/me — full progress for the logged-in student
  getMyProgress: async (): Promise<{ success: boolean; progress?: ScoreboardProgress; error?: string }> => {
    try {
      const response = await api.get('/scoreboard/me');
      return { success: true, progress: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch scoreboard',
      };
    }
  },

  // POST /api/scoreboard/complete/:taskId
  // Pass eventId for tasks that require event attendance.
  completeTask: async (taskId: string, eventId?: string): Promise<{ success: boolean; data?: CompleteTaskResponse; error?: string }> => {
    try {
      const body = eventId ? { eventId } : {};
      const response = await api.post(`/scoreboard/complete/${taskId}`, body);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to complete task',
      };
    }
  },

  // GET /api/scoreboard/eligible-events/:taskId
  getEligibleEvents: async (taskId: string): Promise<{ success: boolean; events?: EligibleEvent[]; error?: string }> => {
    try {
      const response = await api.get(`/scoreboard/eligible-events/${taskId}`);
      return { success: true, events: response.data.events };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch eligible events',
      };
    }
  },

  // DELETE /api/scoreboard/complete/:taskId — undo most recent completion
  undoTask: async (taskId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await api.delete(`/scoreboard/complete/${taskId}`);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to undo completion',
      };
    }
  },
};

export default scoreboardService;
