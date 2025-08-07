// ---------------------- src/controllers/auth.controller.js ----------------------
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.js';
import { generateOTP } from '../utils/otp.js';
import { sendEmail } from '../utils/email.js';




export  const handleSocialLogin = (req, res) => {
  const token = generateAccessToken(req.user);
  const refreshToken = generateRefreshToken(req.user);

  // Set cookies securely
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Redirect to frontend or dashboard
  res.redirect(process.env.CLIENT_URL || '/');
};



export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'Registered successfully' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ accessToken });
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });
  user.otp = otp;
  await user.save();

  await sendEmail(email, 'Your OTP', `Your OTP is ${otp}`);
  res.json({ message: 'OTP sent' });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

  user.otp = null;
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ accessToken });
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const { userId } = verifyToken(token, true);
    const user = await User.findById(userId);
    if (!user || user.refreshToken !== token) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const { userId } = verifyToken(token, true);
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
