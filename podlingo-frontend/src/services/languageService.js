const BASE_URL = process.env.REACT_APP_API_URL;

export const languageService = {
  async getUserLanguages() {
    const response = await fetch(`${BASE_URL}/user/languages`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user languages');
    }
    return response.json();
  },

  async getAvailableLanguages() {
    const response = await fetch(`${BASE_URL}/podcasts/languages`);
    if (!response.ok) {
      throw new Error('Failed to fetch available languages');
    }
    return response.json();
  },

  async getAvailableLevels() {
    const response = await fetch(`${BASE_URL}/podcasts/levels`);
    if (!response.ok) {
      throw new Error('Failed to fetch available levels');
    }
    return response.json();
  },

  async addLanguage(languageCode, level) {
    const response = await fetch(`${BASE_URL}/user/languages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ languageCode, level }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add language');
    }
    return response.json();
  },

  async updateLanguage(languageCode, newLevel) {
    const response = await fetch(`${BASE_URL}/user/languages`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ languageCode, newLevel }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update language');
    }
    return response.json();
  },

  async removeLanguage(languageCode) {
    const response = await fetch(`${BASE_URL}/user/languages`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ languageCode }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove language');
    }
    return response.json();
  },
}; 