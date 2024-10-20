import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const PodcastSearch = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
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

    fetchLanguages();
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
      setError('Error fetching podcasts. Please try again.');
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
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
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