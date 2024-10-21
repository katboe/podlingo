import mongoose from 'mongoose';

const languageLevelKeywordsSchema = new mongoose.Schema({
  language: { type: String, required: true },
  level: { type: String, required: true },
  words: { type: [String], required: true }, // Array of keywords
});

const LanguageLevelKeywords = mongoose.model('LanguageLevelKeywords', languageLevelKeywordsSchema);

export default LanguageLevelKeywords;