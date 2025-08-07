// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import './src/config/passport.js';

dotenv.config();
const app = express();


app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests/1

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'oauth_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// DB Connection
connectDB();

// Routes
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));