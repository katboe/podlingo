import { api } from './api';

export const podcastService = {
  async search(params) {
    const { data } = await api.get('/podcasts/search', { params });
    return data;
  },

  async getAll() {
    const { data } = await api.get('/podcasts');
    return data;
  },

  async getLanguages() {
    const { data } = await api.get('/podcasts/languages');
    return data;
  },

  async getLevels() {
    const { data } = await api.get('/podcasts/levels');
    return data;
  }
}; 