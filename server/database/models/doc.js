const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const TabooWords = require('./taboo');
const Revisions = require('./revision');

const DocSchema = new Schema({
  title: {type: String, required:true},
  content: {type: String, default:''},
  owner_id: {type: Schema.Types.ObjectId, ref: 'User'},
  locked: {type: Schema.Types.ObjectId, default: null, ref: 'User'},
  revisions: [{type: Schema.Types.ObjectId, ref: 'Revision'}],
  privacy : {
    level : {type: String, default:'PUBLIC'},
    members : [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  date_created: {type: Date, default: Date.now}
});

DocSchema.methods.findAllTabooIdx = function(cb){
  //A String is considered a word if there is a space
  //returns indexes of all taboo words, format at each index: [start, end + 1]
  TabooWords.getApprovedTabooWords((err, results) => {
    if (err) {
      return cb(err);
    }
    idx_list = [];
    for (let taboo_word of taboo_words){
      let current_idx = 0;
      let start_idx = 0;
      while((start_idx = this.content.indexOf(taboo_word, current_idx)) > -1){
        idx_list.push([start_idx, start_idx + len(taboo_word)]);
        current_idx = start_idx + len(taboo_word);  
      }
    }
    cb(null,idx_list);
  });
};

DocSchema.methods.containsRevisionIdAfterPopulate = function(revisionId) {
  for(const revision of this.revisions) {
    if (revision._id.equals(revisionId)) {
      return true;
    }
  }
  return false;
};

DocSchema.methods.containsRevisionId = function(revisionId, populated) {
  if (populated) {
    return this.containsRevisionIdAfterPopulate(revisionId);
  }
  else {
    return this.revisions.indexOf(revisionId) >= 0;
  }
};

DocSchema.methods.getVersion = function(revisionId, options, cb){
  if (!this.containsRevisionId(revisionId, options.populated)) {
    return cb({error:"Could not retrieve document version"});
  }
  // Apply changes and call cb with correct content
  // Currently returns the changes of revision since we store the entire content
  Revisions.findById(revisionId, "changes", function(err, result){
    if (err) {
      return cb({error:"Could not retrieve document version"});
    }
    cb(null, result);
  }); 
};

const doc = mongoose.model('Document', DocSchema); 
module.exports = doc;
