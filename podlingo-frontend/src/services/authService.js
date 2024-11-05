import { api } from './api';
import { handleApiError } from '../utils/errorHandling';

export const authService = {
  async verify() {
    try {
      const response = await api.get('/auth/verify', { 
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (!response.data) {
        throw new Error('No response from server');
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
