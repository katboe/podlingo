import { api } from './api';

export const podcastService = {
  async search(params) {
    const response = await api.get('/podcasts/search', { params });
    return response.data.data || { feeds: [] };
  },

  async getAll() {
    const { data } = await api.get('/podcasts');
    return data;
  },

  async getLanguages() {
    const response = await api.get('/podcasts/languages');
    return response.data.data;
  },

  async getLevels() {
    const response = await api.get('/podcasts/levels');
    return response.data.data;
  }
}; 