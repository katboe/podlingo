import mongoose from 'mongoose';
import LanguageLevel from '../models/languageLevel.js'; // Adjust the path as necessary

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "xxx";

const languageLevels = [
  {
    level: 'A1',
    description: 'Beginner level. Can understand and use familiar everyday expressions.',
    criteria: [
      'Can introduce themselves and others.',
      'Can ask and answer questions about personal details.',
      'Can interact in a simple way provided the other person talks slowly and clearly.'
    ],
    examples: [
      'Can fill out forms with personal details.',
      'Can understand basic instructions and directions.'
    ],
    equivalents: ['Basic User', 'Novice'],
    order: 1,
  },
  {
    level: 'A2',
    description: 'Elementary level. Can understand sentences and frequently used expressions.',
    criteria: [
      'Can communicate in simple tasks requiring a simple and direct exchange of information.',
      'Can describe in simple terms aspects of their background, immediate environment, and basic needs.'
    ],
    examples: [
      'Can read short, simple texts.',
      'Can write short, simple notes and messages.'
    ],
    equivalents: ['Elementary User'],
    order: 2,
  }, {
    level: 'B1',
    description: 'Intermediate level. Can understand the main points of clear standard input on familiar matters.',
    criteria: [
      'Can deal with most situations likely to arise while traveling in an area where the language is spoken.',
      'Can produce simple connected text on topics that are familiar or of personal interest.',
      'Can describe experiences, events, dreams, and ambitions, as well as explain opinions and plans.'
    ],
    examples: [
      'Can write simple essays or letters on familiar topics.',
      'Can understand the main idea of radio or TV programs when the language is spoken clearly.'
    ],
    equivalents: ['Threshold User', 'Intermediate User'],
    order: 3,
  },
  {
    level: 'B2',
    description: 'Upper Intermediate level. Can understand the main ideas of complex text on both concrete and abstract topics.',
    criteria: [
      'Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers possible.',
      'Can produce clear, detailed text on a wide range of subjects related to their interests.',
      'Can explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.'
    ],
    examples: [
      'Can write clear and detailed texts on a variety of subjects related to their interests.',
      'Can understand the main ideas of complex texts, including technical discussions in their field.'
    ],
    equivalents: ['Vantage User', 'Upper Intermediate User'],
    order: 4,
  },
  {
    level: 'C1',
    description: 'Advanced level. Can understand a wide range of demanding, longer texts, and recognize implicit meaning.',
    criteria: [
      'Can express ideas fluently and spontaneously without much obvious searching for expressions.',
      'Can use language flexibly and effectively for social, academic, and professional purposes.',
      'Can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organizational patterns, connectors, and cohesive devices.'
    ],
    examples: [
      'Can produce clear, well-structured texts on complex subjects.',
      'Can understand a wide range of demanding texts and recognize implicit meaning.'
    ],
    equivalents: ['Effective Operational Proficient', 'Advanced User'],
    order: 5,
  },
  {
    level: 'C2',
    description: 'Proficient level. Can understand with ease virtually everything heard or read.',
    criteria: [
      'Can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.',
      'Can express themselves spontaneously, very fluently, and precisely, differentiating finer shades of meaning even in more complex situations.'
    ],
    examples: [
      'Can produce clear, smoothly flowing text in an appropriate style.',
      'Can understand and interpret virtually all types of spoken language, including idiomatic expressions and colloquialisms.'
    ],
    equivalents: ['Mastery User', 'Proficient User'],
    order: 6,
  },
];

const populateLanguageLevels = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    await LanguageLevel.deleteMany(); // Clear existing levels
    await LanguageLevel.insertMany(languageLevels); // Insert new levels

    console.log('Language levels populated successfully.');
  } catch (error) {
    console.error('Error populating language levels:', error);
  } finally {
    mongoose.connection.close();
  }
};

populateLanguageLevels();