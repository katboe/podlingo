import { validationResult } from 'express-validator';
import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Handle validation errors from express-validator
  if (Array.isArray(err) && err[0]?.msg) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate key error'
      });
    }
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export default errorHandler; 