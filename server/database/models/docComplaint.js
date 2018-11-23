const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const DocComplaintSchema = new Schema({
  text: {type: String, required: true},
  fromId: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  processed: {type: Boolean, default: false},
  revisionId: {type: Schema.Types.ObjectId, ref: 'Revision'},
  docId: {type: Schema.Types.ObjectId, ref: 'Document'}
})

const docComplaint = mongoose.model('DocComplaints', DocComplaintSchema);
module.exports = docComplaint;
