import { useState, useCallback } from 'react';
import { languageService } from '../services/languageService';

export const useLanguages = () => {
  const [userLanguages, setUserLanguages] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [languages, levels, userLangs] = await Promise.all([
        languageService.getAvailableLanguages(),
        languageService.getAvailableLevels(),
        languageService.getUserLanguages()
      ]);
      
      setAvailableLanguages(Array.isArray(languages) ? languages : []);
      setAvailableLevels(Array.isArray(levels) ? levels : []);
      setUserLanguages(Array.isArray(userLangs) ? userLangs : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAvailableLanguages([]);
      setAvailableLevels([]);
      setUserLanguages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addLanguage = useCallback(async (languageCode, level) => {
    setLoading(true);
    try {
      await languageService.addLanguage(languageCode, level);
      setUserLanguages(prev => [...prev, { code: languageCode, level }]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLanguage = useCallback(async (languageCode, newLevel) => {
    setLoading(true);
    try {
      await languageService.updateLanguage(languageCode, newLevel);
      setUserLanguages(prev => 
        prev.map(lang => lang.code === languageCode ? { ...lang, level: newLevel } : lang)
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeLanguage = useCallback(async (languageCode) => {
    setLoading(true);
    try {
      await languageService.removeLanguage(languageCode);
      setUserLanguages(prev => prev.filter(lang => lang.code !== languageCode));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

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