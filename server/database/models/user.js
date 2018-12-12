const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, default:'GU', required:true}
});

// Pre save hook that activates before a User is saved to db
// Replaces password with hashed password
UserSchema.pre('save', function(next) {
  // Reference to user
  const user = this;
  // Hash password with 10 salt rounds, increment to double time taken
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/*
 * Checks if passwordAttempt matches User's password 
 * Calls cb with appropriate parameters to indicate success or failure
 * cb should be a function that accepts 2 parameters
 */
UserSchema.methods.checkPassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
