import { body } from 'express-validator';

export const registerValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number')
];

export const loginValidation = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
]; 