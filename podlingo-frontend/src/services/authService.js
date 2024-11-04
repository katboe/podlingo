import { api } from './api';
import { handleApiError } from '../utils/errorHandling';

export const authService = {
  async verify() {
    try {
      const response = await api.get('/auth/verify');
      return { data: response.data };
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  },

  async register(userData) {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
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
