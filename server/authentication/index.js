const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/user');

// Converts user info to session cookie
passport.serializeUser((user, done) => {
  done(null, { _id : user._id});
});

// Converts session cookie to user info
passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id},
    "username",
    (err, user) => {
      done(null, user);
    }
  );
});

passport.use(LocalStrategy);
module.exports = passport;
