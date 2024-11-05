import { useState, useCallback } from 'react';
import { podcastService } from '../services/podcastService';

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMetadata = useCallback(async () => {
    setLoading(true);
    try {
      const [languages, levels] = await Promise.all([
        podcastService.getLanguages(),
        podcastService.getLevels()
      ]);
      setAvailableLanguages(Array.isArray(languages) ? languages : []);
      setAvailableLevels(Array.isArray(levels) ? levels : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAvailableLanguages([]);
      setAvailableLevels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPodcasts = useCallback(async (params) => {
    setLoading(true);
    try {
      const result = await podcastService.search(params);
      const feeds = result?.feeds || [];
      setPodcasts(feeds);
      setError(null);
      return feeds;
    } catch (err) {
      setError(err.message);
      setPodcasts([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    podcasts,
    availableLanguages,
    availableLevels,
    loading,
    error,
    fetchMetadata,
    searchPodcasts
  };
}; 