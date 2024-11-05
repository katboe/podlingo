import dotenv from 'dotenv';
dotenv.config();
import { AUTH } from '../constants/index.js';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: AUTH.TOKEN_EXPIRY,
    cookieMaxAge: AUTH.COOKIE_MAX_AGE
  },
  security: {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true
    }
  },
  podcastIndex: {
    apiKey: process.env.PODCAST_INDEX_API_KEY?.trim(),
    apiSecret: process.env.PODCAST_INDEX_API_SECRET?.trim()
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost'
  }
};

export default config; 