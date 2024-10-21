import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import '../PodcastSearch.css'; 

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
      <h1>Search Podcasts</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          {availableLevels.map((levelObj) => (
            <option key={levelObj.level} value={levelObj.level}>
              {levelObj.level}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p>{error}</p>}

      {podcasts.length > 0 && <h2>Results:</h2>}
      <ul>
        {podcasts.map((podcast) => (
          <PodcastItem podcast={podcast} key={podcast.id} />
        ))}
      </ul>
    </div>
  );
};

const PodcastItem = React.memo(({ podcast }) => (
  <li key={podcast.id}>
    <h3>{podcast.title}</h3>
    <p>{podcast.description}</p>
    <p>Author: {podcast.author}</p>
    <a href={podcast.link} target="_blank" rel="noopener noreferrer">Listen</a>
    <img src={podcast.image} alt={podcast.title} loading="lazy" style={{ width: '100px' }} />
  </li>
));

export default PodcastSearch;