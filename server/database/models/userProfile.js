const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  summary:{type = String, default: ''},
  userId:{type: Schema.Types.ObjectId, ref: 'User'}
});


const userProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = userProfile;
