import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';

import Podcast from '../models/podcast.js'
import Language from '../models/language.js';
import LanguageLevel from '../models/languageLevel.js'; 

import classifyPodcastLevel from '../utils/languageLevelClassifier.js';
import authenticateJWT from '../middleware/auth.js'; 

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

// Fetch podcasts for the user based on their preferences
podcastRouter.get('/user', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.userId).populate('languages');

  if (!user || !user.languages) {
    return res.status(404).json({ message: 'No preferences found' });
  }

  const podcasts = []; // This should come from your podcast API or database
  
  // For each language and level, classify and filter podcasts
  for (const { language, level } of user.languages) {
    const filteredPodcasts = podcasts.filter(async podcast => {
      // Logic to classify podcasts based on language and level
      const classification = await classifyPodcastLevel(podcast.title, podcast.description, language);
      return classification === level;
    });

    // Collect the filtered podcasts for this language and level
    userPodcasts[language] = filteredPodcasts;
  }

  res.json({ podcasts: userPodcasts });
});



// Route to search podcasts using Podcast Index API
podcastRouter.get('/search', async (req, res) => {
  const { query, language, level } = req.query;
  const { hashForHeader, apiHeaderTime } = generateAuthHash();

  // Check if language is set
  if (!language) {
    return res.status(400).json({ message: 'Language must be set.' });
  }

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
    // Fetch the specified language from the database
    const selectedLanguage = await Language.findOne({ code: language }).exec();
    const nativeLanguageName = selectedLanguage ? selectedLanguage.nativeName : language; // Default to code if not found

    const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${query}+${nativeLanguageName}&max=200`; //find language podcasts in native language & get many
    const response = await fetch(url, options);
    const data = await response.json();
    
    
    // Get the feeds array
    const podcasts = data.feeds; // Array of podcast objects

    // Filter by language
    let filteredPodcasts = podcasts.filter(podcast => {
      return podcast.language === language; // Assuming the language is case-sensitive
    })

    if (query) {
      filteredPodcasts = filteredPodcasts.filter(podcast => {
        return podcast.title.toLowerCase().includes(query.toLowerCase()) ||
               podcast.description.toLowerCase().includes(query.toLowerCase());
      });
    }

    // Classify podcasts based on title and description
    const classifiedPodcasts = await Promise.all(filteredPodcasts.map(async podcast => {
      const level = await classifyPodcastLevel(podcast.title, podcast.description, language);
      return { ...podcast, classifiedLevel: level }; // Add classification to the podcast object
    }));

    // Filter podcasts by the classified level if 'level' is specified in the query
    const podcastsMatchingLevel = classifiedPodcasts.filter(podcast => {
      return level ? podcast.classifiedLevel === level : true;  // Filter only if 'level' is provided
    });

    // Construct response
    const responsePayload = {
      status: data.status,
      count: podcastsMatchingLevel.length,
      query,
      feeds: podcastsMatchingLevel,
    };

    res.json(responsePayload);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ message: 'Error fetching podcasts.' });
  }
});

// Endpoint to fetch available languages from the database
podcastRouter.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find(); // Fetch languages from the database
    res.json(languages);
  } catch (err) {
    console.error('Error fetching languages:', err);
    res.status(500).json({ message: 'Error fetching languages.' });
  }
});

// Endpoint to fetch available language levels
podcastRouter.get('/levels', async (req, res) => {
  try {
    const levels = await LanguageLevel.find({ isActive: true }).sort('order');
    res.json(levels);
  } catch (err) {
    console.error('Error fetching levels:', err);
    res.status(500).json({ message: 'Error fetching language levels.' });
  }
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


// Default export
export default podcastRouter;