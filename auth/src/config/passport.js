import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.model.js';
// import FacebookStrategy from 'passport-facebook';
// import TwitterStrategy from 'passport-twitter';

import dotenv from 'dotenv';
dotenv.config()


// 🔹 Facebook Strategy
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
//   profileFields: ['id', 'emails', 'name', 'displayName']
// }, async (accessToken, refreshToken, profile, done) => {
//   const email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
//   let user = await User.findOne({ email });
//   if (!user) {
//     user = await User.create({
//       email,
//       name: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
//       provider: 'facebook',
//     });
//   }
//   return done(null, user);
// }));



// 🔹 Twitter Strategy
// passport.use(new TwitterStrategy({
//   consumerKey: process.env.TWITTER_CLIENT_ID,
//   consumerSecret: process.env.TWITTER_CLIENT_SECRET,
//   callbackURL: `${process.env.BASE_URL}/auth/twitter/callback`,
//   includeEmail: true
// }, async (token, tokenSecret, profile, done) => {
//   const email = profile.emails?.[0]?.value || `${profile.id}@twitter.com`;
//   let user = await User.findOne({ email });
//   if (!user) {
//     user = await User.create({
//       email,
//       name: profile.displayName,
//       provider: 'twitter',
//     });
//   }
//   return done(null, user);
// }));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        googleId: profile.id,
        provider: 'google'
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
