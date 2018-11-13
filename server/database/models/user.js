const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
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
