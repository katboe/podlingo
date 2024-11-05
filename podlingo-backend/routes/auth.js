import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import authenticateJWT from '../middleware/auth.js';
import config from '../config/config.js';
import logger from '../config/logger.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { AUTH, HTTP_STATUS, SECURITY } from '../constants/index.js';
import { registerValidation, loginValidation } from '../validation/auth.js';
import rateLimit from 'express-rate-limit';

const authRouter = express.Router();

const authLimiter = rateLimit({
  windowMs: SECURITY.RATE_LIMIT_WINDOW_MS,
  max: SECURITY.AUTH_MAX_ATTEMPTS,
  message: 'Too many login attempts, please try again later'
});

// Registration route
authRouter.post(
  '/register',
  registerValidation,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(errorResponse(errors.array()[0].msg));
      }

      const { username, email, password } = req.body;

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(HTTP_STATUS.CONFLICT)
          .json(errorResponse('Email already exists'));
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(HTTP_STATUS.CONFLICT)
          .json(errorResponse('Username already exists'));
      }

      const hashedPassword = await bcrypt.hash(password, AUTH.SALT_ROUNDS);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      logger.info(`New user registered: ${email}`);

      const token = jwt.sign(
        { _id: user._id, email: user.email, username: user.username },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'Lax',
        path: '/',
        maxAge: config.jwt.cookieMaxAge,
        domain: config.env === 'production' ? config.client.domain : 'localhost'
      });

      return res.status(HTTP_STATUS.CREATED).json(successResponse({
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      }, 'User registered successfully'));
    } catch (error) {
      logger.error('Registration error:', error);
      return next(error);
    }
  }
);

// Login route with validation
authRouter.post('/login', 
  authLimiter,
  loginValidation,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(errorResponse(errors.array()[0].msg));
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email }).lean();
      
      if (!user) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(errorResponse('Invalid credentials'));
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(errorResponse('Invalid credentials'));
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email, username: user.username },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'Lax',
        path: '/',
        maxAge: config.jwt.cookieMaxAge,
        domain: config.env === 'production' ? config.client.domain : 'localhost'
      });

      return res.json(successResponse({
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      }));
    } catch (error) {
      logger.error('Login error:', error);
      return next(error);
    }
  }
);

// Logout route
authRouter.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'Lax',
    path: '/',
    expires: new Date(0),
    domain: config.env === 'production' ? config.client.domain : 'localhost'
  });
  res.json(successResponse(null, 'Logged out successfully'));
});

// Verify route
authRouter.get('/verify', authenticateJWT, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('User not found'));
    }

    return res.json(successResponse({
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    }));
  } catch (error) {
    logger.error('Verify error:', error);
    return next(error);
  }
});

export default authRouter;