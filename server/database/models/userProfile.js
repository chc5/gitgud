const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const Doc = require('./doc');

const UserProfileSchema = new Schema({
  summary:{type: String, default: ''},
  userId:{type: Schema.Types.ObjectId, required: true, ref: 'User'},
  img:{type: String, default: ''},
  recentDocs: [{type: Schema.Types.ObjectId, ref: 'Document'}]
});

UserProfileSchema.pre('save', function(next) {
  const profile = this;
  if (profile.recentDocs.length === 0) {
    // check not private
    // get 3 most popular
    Doc.find({}, "_id", {limit:3, sort:{__v:-1}}, function(err, docs){
      if (err) {
        return next(err);
      }
      for (const doc of docs) {
        profile.recentDocs.unshift(doc._id);
      }
      next();
    }); 
  }
  else {
    next();
  }
}); 

const userProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = userProfile;
