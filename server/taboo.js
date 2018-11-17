const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;
const date = require('date-and-time');

const tabooWordsSchema = new Schema({
  word: {type: String, required: true},
  suggesterId: {type: Number, required: true},
  date: {type: Date, default: Date.now},
  approverId: Number
})

const taboo = mongoose.model('TabooWords', tabooWordsSchema);
module.exports = taboo;
