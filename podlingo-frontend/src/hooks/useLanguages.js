import { useState } from 'react';

const BASE_URL = process.env.REACT_APP_API_URL;

export const useLanguages = () => {
  const [userLanguages, setUserLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [languages, levels, userLangs] = await Promise.all([
        fetch(`${BASE_URL}/podcasts/languages`).then(res => res.json()),
        fetch(`${BASE_URL}/podcasts/levels`).then(res => res.json()),
        fetch(`${BASE_URL}/user/languages`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
      ]);
      
      setAvailableLanguages(languages);
      setAvailableLevels(levels);
      setUserLanguages(userLangs);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addLanguage = async (languageCode, level) => {
    try {
      const response = await fetch(`${BASE_URL}/user/languages`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageCode, level }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add language');
      }

      await response.json();
      setUserLanguages(prev => [...prev, { code: languageCode, level }]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateLanguage = async (languageCode, newLevel) => {
    try {
      const response = await fetch(`${BASE_URL}/user/languages`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageCode, newLevel }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update language');
      }

      setUserLanguages(prev => 
        prev.map(lang => lang.code === languageCode ? { ...lang, level: newLevel } : lang)
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const removeLanguage = async (languageCode) => {
    try {
      const response = await fetch(`${BASE_URL}/user/languages`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove language');
      }

      setUserLanguages(prev => prev.filter(lang => lang.code !== languageCode));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return {
    userLanguages,
    availableLanguages,
    availableLevels,
    error,
    loading,
    fetchData,
    addLanguage,
    updateLanguage,
    removeLanguage
  };
};

export default useLanguages; 