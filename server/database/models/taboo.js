const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const TabooWordsSchema = new Schema({
  word: {type: String, required: true},
  suggesterId: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  approverId: {type: Schema.Types.ObjectId, ref: 'User'}
})

TabooWordsSchema.statics.getApprovedTabooWords = function(cb) {
  return this.find({approverId : {$ne:null}}, "word", function(err, results) {
    if (err) {
      return cb(err);
    }
    cb(null, results);
  });
};

TabooWordsSchema.statics.findAllTabooWords = function(content, cb){
  this.getApprovedTabooWords((err, tabooWords) => {
    if (err) {
      return cb(err);
    }
    const foundWords = [];
    for (const tabooWord of tabooWords){
      if (content.indexOf(tabooWord.word) > -1){
        foundWords.push(tabooWord.word);
      }
    }
    cb(null,foundWords);
  });
};

const taboo = mongoose.model('TabooWords', TabooWordsSchema);
module.exports = taboo;
