import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Box,
  List,
  ListItem,
} from '@mui/material';
import PodcastItem from './PodcastItem.js';

const PodcastSearch = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  // Fetch available languages and levels on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts/languages`);
        setAvailableLanguages(response.data);
      } catch (err) {
        setError('Error fetching languages.');
        setSnackbarOpen(true);
      }
    };

    const fetchLevels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts/levels`);
        setAvailableLevels(response.data);
      } catch (err) {
        setError('Error fetching language levels.');
        setSnackbarOpen(true);
      }
    };

    fetchLanguages();
    fetchLevels();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setPodcasts([]);

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
        setError('Network error. Please check your connection and try again.');
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Search Podcasts</Typography>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{ minWidth: '300px' }} // Minimum width to prevent it from being too small
        />
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ minWidth: '300px' }} // Minimum width for the select field
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
          sx={{ minWidth: '300px' }} // Minimum width for the select field
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
          sx={{ minWidth: '300px' }} // Minimum width for the button
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {podcasts.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Results:</Typography>
          <List>
            {podcasts.map((podcast) => (
              <ListItem key={podcast.id}>
                <PodcastItem podcast={podcast} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PodcastSearch;
