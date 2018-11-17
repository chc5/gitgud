const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const date = require('date-and-time');

const TabooWordsSchema = new Schema({
  word: {type: String, required: true},
  suggesterId: {type: Number, ref: 'User'},
  date: {type: Date, default: Date.now},
  approverId: {type: Number, ref: 'User'}
})

const taboo = mongoose.model('TabooWords', TabooWordsSchema);
module.exports = taboo;
