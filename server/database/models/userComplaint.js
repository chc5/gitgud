const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const UserComplaintSchema = new Schema({
  text: {type: String, required: true},
  fromUserId: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  processed: {type: Boolean, default: false},
  targetUserId: {type: Schema.Types.ObjectId, ref: 'User'}
})

const userComplaint = mongoose.model('UserComplaints', UserComplaintSchema);
module.exports = UserComplaint;
