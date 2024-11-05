import { body } from 'express-validator';
import { LANGUAGE_LEVELS } from '../constants/index.js';

export const languageValidation = [
  body('languageCode')
    .isString()
    .isLength({ min: 2, max: 3 })
    .withMessage('Invalid language code'),
  
  body('level')
    .isIn(Object.values(LANGUAGE_LEVELS))
    .withMessage('Invalid language level')
];

export const updateLanguageValidation = [
  body('languageCode')
    .isString()
    .isLength({ min: 2, max: 3 })
    .withMessage('Invalid language code'),
  
  body('newLevel')
    .isIn(Object.values(LANGUAGE_LEVELS))
    .withMessage('Invalid language level')
];

export const deleteLanguageValidation = [
  body('languageCode')
    .isString()
    .isLength({ min: 2, max: 3 })
    .withMessage('Invalid language code')
];
