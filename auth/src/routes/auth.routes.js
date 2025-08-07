import express from 'express';
import passport from 'passport';
import { handleSocialLogin } from'../controllers/auth.controller.js';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  refreshAccessToken,
  logout,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/otp/send', sendOtp);
router.post('/otp/verify', verifyOtp);
router.post('/token/refresh', refreshAccessToken);
router.post('/logout', logout);





// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  (req, res) => {
    res.send('Google login successful');
  }
);

// FACEBOOK
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook', {
//   session: false,
//   failureRedirect: '/login',
// }), handleSocialLogin);

// TWITTER
// router.get('/twitter', passport.authenticate('twitter'));
// router.get('/twitter/callback', passport.authenticate('twitter', {
//   session: false,
//   failureRedirect: '/login',
// }), handleSocialLogin);


router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), handleSocialLogin);
// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), handleSocialLogin);
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), handleSocialLogin);



export default router;