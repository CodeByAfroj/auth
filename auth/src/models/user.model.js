import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  refreshToken: { type: String },
  provider: { type: String,  enum: ['local', 'google', 'facebook', 'twitter'], default: 'local' },
  googleId: { type: String },
});

export default mongoose.model('User', userSchema);