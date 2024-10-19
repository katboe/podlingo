import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PodcastList = () => {
    const [podcasts, setPodcasts] = useState([]);
  
    // Fetch podcasts from the API
    useEffect(() => {
      const fetchPodcasts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/podcasts`);
          setPodcasts(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchPodcasts();
    }, []);

    return (
        <div>
      {podcasts.length > 0 ? (
        podcasts.map((podcast) => (
          <div key={podcast._id} className="podcast-item">
            <h3>{podcast.title}</h3>
            <p><strong>Language:</strong> {podcast.language}</p>
            <p><strong>Level:</strong> {podcast.level}</p>
            <p><strong>Topic:</strong> {podcast.topic}</p>
            <p><strong>Description:</strong> {podcast.description}</p>
            <a href={podcast.url} target="_blank" rel="noopener noreferrer">Listen to Podcast</a>
          </div>
        ))
      ) : (
        <p>No podcasts available</p>
      )}
    </div>
    );
};

export default PodcastList;