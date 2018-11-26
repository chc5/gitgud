const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const RevisionSchema = new Schema({
  doc_id: {type: Schema.Types.ObjectId, ref:'Document'},
  changes: Schema.Types.Mixed,
  date_created: {type: Date, default: Date.now},
  modifier_id: {type: Schema.Types.ObjectId, ref: 'User'}
});

const revision = mongoose.model('Revision', RevisionSchema); 
module.exports = revision;
