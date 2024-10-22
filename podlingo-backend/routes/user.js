// routes/user.js
import express from 'express';
import User from '../models/user.js';
import { authenticateJWT } from '../middleware/auth.js'; // Middleware to authenticate JWT

const userRouter = express.Router();

// Update user languages and levels
userRouter.post('/languages', authenticateJWT, async (req, res) => {
  const { languages } = req.body;
  await User.findByIdAndUpdate(req.user.userId, { languages });
  res.json({ message: 'Languages updated' });
});

// Get all languages for the specific user
userRouter.get('/languages', authenticateJWT, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('languages'); // Fetch only the languages field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.languages); // Return the languages
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
export default userRouter;