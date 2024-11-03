// routes/user.js
import express from 'express';
import User from '../models/user.js';
import authenticateJWT from '../middleware/auth.js'; // Middleware to authenticate JWT

const userRouter = express.Router();

// Add a new user languages and levels
userRouter.post('/languages', authenticateJWT, async (req, res) => {
  const { languageCode, level } = req.body;

  try {
    const user = await User.findById(req.user._id); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the language already exists
    const existingLanguage = user.languages.find(lang => lang.code === languageCode);
    if (existingLanguage) {
      return res.status(400).json({ message: 'Language already added' });
    }

    // If it doesn't exist, add the new language
    user.languages.push({ code: languageCode, level: level });
    await user.save(); // Save the updated user

    res.json({ message: 'Languages updated', languages: user.languages }); // Return the updated languages
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a specific language level for the user
userRouter.put('/languages', authenticateJWT, async (req, res) => {
  const { languageCode, newLevel } = req.body;
  
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find and update the language in the user's languages array
    const languageToUpdate = user.languages.find(lang => lang.code === languageCode);
    if (!languageToUpdate) return res.status(404).json({ message: 'Language not found' });

    languageToUpdate.level = newLevel;
    await user.save();
    
    res.json({ message: 'Language level updated', updatedLanguage: languageToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete user languages and levels
userRouter.delete('/languages', authenticateJWT, async (req, res) => {
  const { languageCode } = req.body; // Extract the language code from the request body

  try {
    // Find user by ID and remove the specified language
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { languages: { code: languageCode } } }, // Use $pull to remove the language
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Language removed successfully', languages: user.languages });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all languages for the specific user
userRouter.get('/languages', authenticateJWT, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);//.select('languages'); // Fetch only the languages field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.languages); // Return the languages
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
export default userRouter;