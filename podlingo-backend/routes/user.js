// routes/user.js
import express from 'express';
import User from '../models/user.js';
import { authenticateJWT } from '../middleware/auth.js'; // Middleware to authenticate JWT

const userRouter = express.Router();

// Update user languages and levels
userRouter.post('/preferences', authenticateJWT, async (req, res) => {
  const { languages } = req.body;
  await User.findByIdAndUpdate(req.user.userId, { languages });
  res.json({ message: 'Preferences updated' });
});

export default userRouter;