import React, { useEffect, useState } from 'react';
import { podcastService } from '../services/podcastService';

const PodcastList = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [filteredPodcasts, setFilteredPodcasts] = useState([]);  // Store filtered podcasts
    const [searchTerm, setSearchTerm] = useState('');  // For searching by title or description
    const [language, setLanguage] = useState('');  // For filtering by language
    const [level, setLevel] = useState('');  // For filtering by level
  
  
    // Fetch podcasts from the backend
    useEffect(() => {
      const fetchPodcasts = async () => {
        try {
          const data = await podcastService.getAll();
          setPodcasts(data);
          setFilteredPodcasts(data);
        } catch (err) {
          console.error('Error fetching podcasts:', err.message);
        }
      };
      fetchPodcasts();
    }, []);


      // Handle search form submit
    const handleSearch = (e) => {
      e.preventDefault();
      
      // Filter the podcasts based on search criteria
      const results = podcasts.filter(podcast => {
        const matchesLanguage = language ? podcast.language === language : true;
        const matchesLevel = level ? podcast.level === level : true;
        const matchesSearchTerm = searchTerm
          ? podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
          
        return matchesLanguage && matchesLevel && matchesSearchTerm;
      });

      setFilteredPodcasts(results);
    };

    return (
      <div>
      <h2>Podcast List</h2>

      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          {/* Add other languages */}
        </select>

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {/* Display filtered podcasts */}
      <ul>
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map(podcast => (
            <li key={podcast._id}>
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
              <p><strong>Language:</strong> {podcast.language}</p>
              <p><strong>Level:</strong> {podcast.level}</p>
            </li>
          ))
        ) : (
          <p>No podcasts found.</p>
        )}
      </ul>
    </div>
  );
};

export default PodcastList;