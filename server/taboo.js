const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const TabooWordsSchema = new Schema({
  word: {type: String, required: true},
  suggesterId: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  approverId: {type: Schema.Types.ObjectId, ref: 'User'}
})

const taboo = mongoose.model('TabooWords', TabooWordsSchema);
module.exports = taboo;
