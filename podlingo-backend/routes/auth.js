import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Register a new user
// Registration route
authRouter.post(
    '/register',
    [
      body('username').notEmpty().withMessage('Username is required'),
      body('email').isEmail().withMessage('Invalid email address'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, email, password } = req.body;
  
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });
  
        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    }
  );

// Login a user
// Login route
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

export default authRouter;