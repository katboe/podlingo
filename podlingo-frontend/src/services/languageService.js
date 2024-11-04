import { api } from './api';
import { handleApiError } from '../utils/errorHandling';

export const languageService = {
  async getUserLanguages() {
    try {
      const { data } = await api.get('/user/languages');
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getAvailableLanguages() {
    try {
      const { data } = await api.get('/podcasts/languages');
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getAvailableLevels() {
    try {
      const { data } = await api.get('/podcasts/levels');
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async addLanguage(languageCode, level) {
    try {
      const { data } = await api.post('/user/languages', { languageCode, level });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async updateLanguage(languageCode, newLevel) {
    try {
      const { data } = await api.put('/user/languages', { languageCode, newLevel });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async removeLanguage(languageCode) {
    try {
      const { data } = await api.delete('/user/languages', { 
        data: { languageCode } 
      });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 