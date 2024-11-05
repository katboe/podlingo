import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import config from '../config/config.js';
import { SECURITY } from '../constants/index.js';

const securityMiddleware = {
  helmetConfig: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.podcastindex.org"],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    dnsPrefetchControl: true,
    frameguard: { action: "deny" },
    hsts: {
      maxAge: SECURITY.HSTS_MAX_AGE,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xssFilter: true
  }),

  rateLimiter: rateLimit({
    windowMs: SECURITY.RATE_LIMIT_WINDOW_MS,
    max: config.env === 'production' ? SECURITY.RATE_LIMIT_MAX_REQUESTS : SECURITY.RATE_LIMIT_MAX_REQUESTS * 10,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  }),

  compression: compression({
    level: 6,
    threshold: parseInt(SECURITY.MAX_REQUEST_SIZE) * 1024, // Convert to bytes
  })
};

export default securityMiddleware; 