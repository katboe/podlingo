// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true,  unique: true, lowercase: true },
  password: { type: String, required: true },
  languages: [{
    code: String,
    level: String,
  }],
});

const User = mongoose.model('User', userSchema);
export default User;
