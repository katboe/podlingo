// models/languageLevel.js
import mongoose from 'mongoose';

const languageLevelSchema = new mongoose.Schema({
    level: { type: String, required: true },
    description: { type: String, required: true },
    criteria: { type: [String], required: true },
    examples: { type: [String], required: true },
    equivalents: { type: [String], required: true },
    order: { type: Number, required: true },
  });

const LanguageLevel = mongoose.model('LanguageLevel', languageLevelSchema);

export default LanguageLevel;