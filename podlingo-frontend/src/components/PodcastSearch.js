import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem
} from '@mui/material';
import PodcastItem from './PodcastItem';
import SnackbarNotification from './SnackbarNotification';
import { usePodcasts } from '../hooks/usePodcasts';

const PodcastSearch = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const {
    podcasts,
    availableLanguages,
    availableLevels,
    loading,
    error,
    fetchMetadata,
    searchPodcasts
  } = usePodcasts();

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSearch = () => {
    searchPodcasts({ query, language, level });
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

      <SnackbarNotification 
        open={snackbarOpen} 
        onClose={() => setSnackbarOpen(false)} 
        message={error || 'An error occurred'} 
      />
    </Box>
  );
};

export default PodcastSearch;
