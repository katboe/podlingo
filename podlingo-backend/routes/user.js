// routes/user.js
import express from 'express';
import User from '../models/user.js';
import authenticateJWT from '../middleware/auth.js';
import logger from '../config/logger.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/index.js';
import { validationResult } from 'express-validator';
import { languageValidation, updateLanguageValidation, deleteLanguageValidation } from '../validation/user.js';

const userRouter = express.Router();

// Add validation middleware to routes
userRouter.post('/languages', 
  authenticateJWT, 
  languageValidation,
  async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(errors.array()[0].msg));
    }
    
    const { languageCode, level } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('User not found'));
    }

    const existingLanguage = user.languages.find(lang => lang.code === languageCode);
    if (existingLanguage) {
      return res.status(HTTP_STATUS.CONFLICT)
        .json(errorResponse('Language already added'));
    }

    user.languages.push({ code: languageCode, level });
    await user.save();
    
    logger.info(`Language added for user ${user.email}: ${languageCode}`);
    res.json(successResponse({ languages: user.languages }, 'Language added successfully'));
  } catch (error) {
    logger.error('Add language error:', error);
    next(error);
  }
});

// Update a specific language level for the user
userRouter.put('/languages', 
  authenticateJWT,
  updateLanguageValidation,
  async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(errors.array()[0].msg));
    }
    
    const { languageCode, newLevel } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('User not found'));
    }

    const languageToUpdate = user.languages.find(lang => lang.code === languageCode);
    if (!languageToUpdate) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Language not found'));
    }

    languageToUpdate.level = newLevel;
    await user.save();
    
    logger.info(`Language level updated for user ${user.email}: ${languageCode} to ${newLevel}`);
    res.json(successResponse({ 
      updatedLanguage: languageToUpdate 
    }, 'Language level updated successfully'));
  } catch (error) {
    logger.error('Update language error:', error);
    next(error);
  }
});

// Delete user languages and levels
userRouter.delete('/languages', 
  authenticateJWT, 
  deleteLanguageValidation,
  async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse(errors.array()[0].msg));
    }

    const { languageCode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { languages: { code: languageCode } } },
      { new: true }
    );

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('User not found'));
    }

    logger.info(`Language deleted for user ${user.email}: ${languageCode}`);
    res.json(successResponse({ 
      languages: user.languages 
    }, 'Language removed successfully'));
  } catch (error) {
    logger.error('Delete language error:', error);
    next(error);
  }
});

// Get all languages for the specific user
userRouter.get('/languages', authenticateJWT, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('User not found'));
    }
    res.json(successResponse(user.languages));
  } catch (error) {
    logger.error('Get languages error:', error);
    next(error);
  }
});

export default userRouter;