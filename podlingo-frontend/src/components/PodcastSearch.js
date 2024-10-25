import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, CircularProgress, Typography } from '@mui/material';
import PodcastItem from './PodcastItem.js';

const PodcastSearch = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [availableLevels, setAvailableLevels] = useState([]); 
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available languages on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts/languages`); // Adjust API endpoint as necessary
        setAvailableLanguages(response.data);
      } catch (err) {
        setError('Error fetching languages.');
      }
    };

    const fetchLevels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts/levels`); // Fetch levels from new endpoint
        setAvailableLevels(response.data);
      } catch (err) {
        setError('Error fetching language levels.');
      }
    };

    fetchLanguages();
    fetchLevels();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPodcasts([]); // Clear previous results before the new search

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts/search`, {
        params: { query, language, level },
      });
      const { feeds } = response.data;
      setPodcasts(feeds);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError('Please select a language.');
        } else if (err.response.status === 500) {
          setError('Error fetching podcasts from the server. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        // If the error doesn't have a response (e.g., network issues)
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">Search Podcasts</Typography>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">
            <em>Select Language</em>
          </MenuItem>
          {availableLanguages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">
            <em>Select Level</em>
          </MenuItem>
          {availableLevels.map((levelObj) => (
            <MenuItem key={levelObj.level} value={levelObj.level}>
              {levelObj.level}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      {podcasts.length > 0 && <Typography variant="h6">Results:</Typography>}
      <ul>
        {podcasts.map((podcast) => (
          <PodcastItem podcast={podcast} key={podcast.id} />
        ))}
      </ul>
    </div>
  );
};

export default PodcastSearch;