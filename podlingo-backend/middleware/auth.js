import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import logger from '../config/logger.js';
import { errorResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/index.js';

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED)
      .json(errorResponse('No token provided'));
  }

  try {
    const user = jwt.verify(token, config.jwt.secret);
    req.user = user;
    next();
  } catch (error) {
    logger.error('JWT verification error:', error);
    return res.status(HTTP_STATUS.FORBIDDEN)
      .json(errorResponse('Invalid or expired token'));
  }
};

export default authenticateJWT;