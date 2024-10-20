import mongoose from 'mongoose';

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  language: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
});

export default mongoose.model('Podcast', PodcastSchema);
