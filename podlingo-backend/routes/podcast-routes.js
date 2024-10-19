const express = require('express');
const Podcast = require('../models/podcast');
const router = express.Router();

//get all podcasts
router.get('/', async(req, res) => {
    try {
        const podcasts = await Podcast.find();
        res.json(podcasts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add a new podcast
router.post('/', async (req, res) => {
    const podcast = new Podcast({
      title: req.body.title,
      language: req.body.language,
      level: req.body.level,
      topic: req.body.topic,
      url: req.body.url,
      description: req.body.description
    });
    try {
      const newPodcast = await podcast.save();
      res.status(201).json(newPodcast);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = router;