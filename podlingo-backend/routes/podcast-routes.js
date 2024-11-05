import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';
import config from '../config/config.js';
import logger from '../config/logger.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/index.js';
import Podcast from '../models/podcast.js';
import Language from '../models/language.js';
import LanguageLevel from '../models/languageLevel.js';
import classifyPodcastLevel from '../utils/languageLevelClassifier.js';
import authenticateJWT from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';
import { SECURITY, API } from '../constants/index.js';

const podcastRouter = express.Router();

const generateAuthHash = () => {
  const apiHeaderTime = Math.floor(Date.now() / 1000);
  const sha1Hash = crypto.createHash('sha1');
  const dataForHash = config.podcastIndex.apiKey + config.podcastIndex.apiSecret + apiHeaderTime;
  
  sha1Hash.update(dataForHash);
  return { 
    hashForHeader: sha1Hash.digest('hex'), 
    apiHeaderTime 
  };
};

const podcastLimiter = rateLimit({
  windowMs: SECURITY.RATE_LIMIT_WINDOW_MS,
  max: SECURITY.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later'
});

podcastRouter.use(podcastLimiter);

// Get all podcasts
podcastRouter.get('/', async(req, res, next) => {
  try {
    const podcasts = await Podcast.find();
    res.json(successResponse(podcasts || [])); // Ensure we always return an array
  } catch (error) {
    logger.error('Error fetching podcasts:', error);
    next(error);
  }
});

// Get languages
podcastRouter.get('/languages', async (req, res, next) => {
  try {
    const languages = await Language.find().lean();
    res.json({
      success: true,
      data: languages || [],
      message: 'Languages fetched successfully'
    });
  } catch (error) {
    logger.error('Error fetching languages:', error);
    next(error);
  }
});

// Get levels
podcastRouter.get('/levels', async (req, res, next) => {
  try {
    const levels = await LanguageLevel.find({ isActive: true }).sort('order').lean();
    res.json({
      success: true,
      data: levels || [],
      message: 'Levels fetched successfully'
    });
  } catch (error) {
    logger.error('Error fetching levels:', error);
    next(error);
  }
});

// Search podcasts
podcastRouter.get('/search', async (req, res, next) => {
  try {
    if (!config.podcastIndex.apiKey || !config.podcastIndex.apiSecret) {
      return res.status(HTTP_STATUS.SERVER_ERROR)
        .json(errorResponse('Podcast Index API configuration missing'));
    }
    const { query, language, level } = req.query;

    if (!language) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Language must be set.'));
    }

    const { hashForHeader, apiHeaderTime } = generateAuthHash();
    const selectedLanguage = await Language.findOne({ code: language });
    const nativeLanguageName = selectedLanguage?.nativeName || language;

    const response = await fetch(
      `https://api.podcastindex.org/api/1.0/search/byterm?q=${query}+${nativeLanguageName}&max=200`,
      {
        headers: {
          'X-Auth-Date': apiHeaderTime.toString(),
          'X-Auth-Key': config.podcastIndex.apiKey,
          'Authorization': hashForHeader,
          'User-Agent': 'PodlingoApp/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Podcast API error: ${response.statusText}`);
    }

    const data = await response.json();
    const podcasts = data.feeds || [];

    let filteredPodcasts = podcasts.filter(podcast => podcast.language === language);
    
    if (query) {
      filteredPodcasts = filteredPodcasts.filter(podcast => 
        podcast.title.toLowerCase().includes(query.toLowerCase()) ||
        podcast.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    const classifiedPodcasts = await Promise.all(
      filteredPodcasts.map(async podcast => ({
        ...podcast,
        classifiedLevel: await classifyPodcastLevel(podcast.title, podcast.description, language)
      }))
    );

    const podcastsMatchingLevel = level 
      ? classifiedPodcasts.filter(podcast => podcast.classifiedLevel === level)
      : classifiedPodcasts;

    res.json(successResponse({
      feeds: podcastsMatchingLevel,
      count: podcastsMatchingLevel.length,
      query
    }));
  } catch (error) {
    logger.error('Error searching podcasts:', error);
    next(error);
  }
});

export default podcastRouter;