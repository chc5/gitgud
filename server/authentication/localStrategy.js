const User = require('../database/models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    // POST field
    usernameField: 'userName'
  },
  function (username, password, done) {
    User.findOne({username:username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {error: "Incorrect login credentials"});
      }
      user.checkPassword(password, function(err, match){
        if (err || !match) {
          return done(null, false, {error: "Incorrect login credentials"});
        }
        return done(null, user);
      });
    });
  }
);
module.exports = strategy;
