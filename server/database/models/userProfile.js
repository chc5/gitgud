const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const imgur = require('imgur');

const UserProfileSchema = new Schema({
  summary:{type: String, default: ''},
  userId:{type: Schema.Types.ObjectId, required: true, ref: 'User'},
  img:{type: String, default: ''},
  recentDocs: [{type: Schema.Types.ObjectId, ref: 'Document'}]
});

const UserProfileSchema.methods.upload = function(filepath){
  // Setting
  imgur.setClientId('aCs53GSs4tga0ikp');
 
  // Getting
  imgur.getClientId();
 
  // Saving to disk. Returns a promise.
  // NOTE: path is optional. Defaults to ~/.imgur
  imgur.saveClientId(path)
    .then(function () {
        console.log('Saved.');
    })
    .catch(function (err) {
        console.log(err.message);
    });
 
  // Loading from disk
  // NOTE: path is optional. Defaults to ~/.imgur
  imgur.loadClientId(path)
    .then(imgur.setClientId);

  // A single image
  imgur.uploadFile(filepath)
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });
};


const userProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = userProfile;
