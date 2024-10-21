// models/language.js
import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // English name
    nativeName: { type: String, required: true }, // Native name
});

const Language = mongoose.model('Language', languageSchema);
export default Language;