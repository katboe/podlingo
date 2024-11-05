import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import timeout from 'express-timeout-handler';
import rateLimit from 'express-rate-limit';
import config from './config/config.js';
import logger from './config/logger.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import podcastRouter from './routes/podcast-routes.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import { successResponse } from './utils/response.js';
import securityMiddleware from './middleware/security.js';
import { SECURITY, HTTP_STATUS } from './constants/index.js';

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: config.client.url,
  credentials: true
};

// Apply security middleware
app.use(securityMiddleware.helmetConfig);
app.use(securityMiddleware.compression);
app.use(securityMiddleware.rateLimiter);

// Apply timeout and other middleware
app.use(timeout.handler({
  timeout: SECURITY.REQUEST_TIMEOUT_MS,
  onTimeout: function(req, res) {
    res.status(HTTP_STATUS.REQUEST_TIMEOUT).json({
      success: false,
      message: 'Request timeout'
    });
  }
}));
app.use(express.json({ limit: SECURITY.MAX_REQUEST_SIZE }));
app.use(express.urlencoded({ extended: true, limit: SECURITY.MAX_REQUEST_SIZE }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Add request logging in development
if (config.env === 'development') {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/podcasts', podcastRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => {
  res.json(successResponse(null, 'Welcome to the Podlingo API!'));
});

// Error handling middleware
app.use(errorHandler);

const PORT = config.port;

// Create HTTP server instance
const server = app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

// Graceful shutdown handlers
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    server.close(() => {
      logger.info('Server closed. Shutting down gracefully');
      process.exit(0);
    });
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  gracefulShutdown();
});


