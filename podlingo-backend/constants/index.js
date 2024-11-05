//only pure constants (do not depend on runtime or environment conditions)
export const AUTH = {
  TOKEN_EXPIRY: '1h',
  COOKIE_MAX_AGE: 3600000,
  SALT_ROUNDS: 10
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  SERVER_ERROR: 500
};

export const API = {
  PODCAST_INDEX_VERSION: '1.0',
  MAX_RESULTS: 200
};

export const SECURITY = {
  REQUEST_TIMEOUT_MS: 30000,
  MAX_REQUEST_SIZE: '10kb',
  DB_MAX_POOL_SIZE: 10,
  DB_MIN_POOL_SIZE: 2,
  DB_SELECTION_TIMEOUT_MS: 5000,
  DB_SOCKET_TIMEOUT_MS: 45000,
  DB_CONNECT_TIMEOUT_MS: 10000,
  DB_MAX_RETRIES: 3,
  DB_RETRY_DELAY_MS: 5000,
  RATE_LIMIT_WINDOW_MS: 900000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  AUTH_MAX_ATTEMPTS: 5,
  COMPRESSION_LEVEL: 6,
  HSTS_MAX_AGE: 31536000, // 1 year in seconds
  CSP_DIRECTIVES: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.podcastindex.org"],
  }
};

export const LANGUAGE_LEVELS = {
  BEGINNER: 'A1',
  ELEMENTARY: 'A2',
  INTERMEDIATE: 'B1',
  UPPER_INTERMEDIATE: 'B2',
  ADVANCED: 'C1',
  MASTERY: 'C2',
  DEFAULT: 'C1',
  CODE_MIN_LENGTH: 2,
  CODE_MAX_LENGTH: 3
}; 