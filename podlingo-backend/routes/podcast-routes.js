import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';

import Podcast from '../models/podcast.js'
import classifyPodcastLevel from '../utils/languageLevelClassifier.js';

const podcastRouter = express.Router();

// Podcast Index API key and secret from environment variables
const PODCAST_INDEX_API_KEY = process.env.PODCAST_INDEX_API_KEY.trim();
const PODCAST_INDEX_API_SECRET = process.env.PODCAST_INDEX_API_SECRET.trim();

const generateAuthHash = () => {
  const apiHeaderTime = Math.floor(Date.now() / 1000);
  const sha1Algorithm = 'sha1';
  const sha1Hash = crypto.createHash(sha1Algorithm);
  const dataForHash = PODCAST_INDEX_API_KEY + PODCAST_INDEX_API_SECRET + apiHeaderTime;
  
  sha1Hash.update(dataForHash);
  const hashForHeader = sha1Hash.digest('hex');
  return { hashForHeader, apiHeaderTime };
};

// Route to search podcasts using Podcast Index API
// Route to search podcasts using Podcast Index API
podcastRouter.get('/search', async (req, res) => {
  const { query, language, level } = req.query;
  const { hashForHeader, apiHeaderTime } = generateAuthHash();

  const options = {
    method: 'GET',
    headers: {
      'X-Auth-Date': apiHeaderTime.toString(),
      'X-Auth-Key': PODCAST_INDEX_API_KEY,
      'Authorization': hashForHeader,
      'User-Agent': 'PodlingoApp/1.0',
    },
  };

  try {
    const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${query}`
    const response = await fetch(url, options);
    const data = await response.json();
    
    
    // Get the feeds array
    const podcasts = data.feeds; // Array of podcast objects

    // Filter by language
    const filteredPodcasts = podcasts.filter(podcast => {
      return podcast.language === language; // Assuming the language is case-sensitive
    });

    // Filter by language (this can be adjusted based on how you identify language)
    // const finalResults = podcasts.filter(podcast => {
    //   // Assuming podcast language is in the 'language' field, adjust as necessary
    //   return podcast.language === language;
    // });

    // // Determine level for each podcast
    // const filteredAndLabeled = filteredByLanguage.map(podcast => {
    //   const level = classifyPodcastLevel(podcast.description); // Implement your classification logic
    //   return { ...podcast, level }; // Attach level to the podcast data
    // });

    // // Filter by user-selected level
    // const finalResults = filteredAndLabeled.filter(podcast => {
    //   return podcast.level === level; // Adjust to handle cases where level is undefined
    // });

    // Construct response
    const responsePayload = {
      status: data.status,
      count: filteredPodcasts.length,
      query,
      feeds: filteredPodcasts,
    };

    res.json(responsePayload);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ message: 'Error fetching podcasts.' });
  }
});

// Endpoint to fetch available languages
podcastRouter.get('/languages', (req, res) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    // Add more languages here
  ];
  
  res.json(languages);
});

//get all podcasts
podcastRouter.get('/', async(req, res) => {
    try {
        const podcasts = await Podcast.find();
        res.json(podcasts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add a new podcast
podcastRouter.post('/', async (req, res) => {
    const podcast = new Podcast({
      title: req.body.title,
      language: req.body.language,
      level: req.body.level,
      topic: req.body.topic,
      url: req.body.url,
      description: req.body.description
    });
    try {
      const newPodcast = await podcast.save();
      res.status(201).json(newPodcast);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  export default podcastRouter;