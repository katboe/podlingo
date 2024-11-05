import mongoose from 'mongoose';
import config from './config.js';
import logger from './logger.js';
import { SECURITY } from '../constants/index.js';

const connectDB = async () => {
  const options = {
    maxPoolSize: SECURITY.DB_MAX_POOL_SIZE,
    minPoolSize: SECURITY.DB_MIN_POOL_SIZE,
    serverSelectionTimeoutMS: SECURITY.DB_SELECTION_TIMEOUT_MS,
    socketTimeoutMS: SECURITY.DB_SOCKET_TIMEOUT_MS,
    connectTimeoutMS: SECURITY.DB_CONNECT_TIMEOUT_MS,
    retryWrites: true,
    retryReads: true
  };

  let retries = SECURITY.DB_MAX_RETRIES;
  while (retries) {
    try {
      await mongoose.connect(config.mongoUri, options);
      logger.info('MongoDB connected successfully');
      break;
    } catch (error) {
      retries -= 1;
      logger.error(`MongoDB connection attempt failed. Retries left: ${retries}`);
      if (!retries) {
        logger.error('MongoDB connection failed after all retries');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, SECURITY.DB_RETRY_DELAY_MS));
    }
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting to reconnect...');
    connectDB();
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB error:', err);
    if (err.name === 'MongoNetworkError') {
      logger.info('Attempting to reconnect to MongoDB...');
      connectDB();
    }
  });
};

export default connectDB;