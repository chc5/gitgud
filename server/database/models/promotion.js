const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  userId : {type: Schema.Types.ObjectId, ref:'User', required:true},
  content: {type: String, default:''}
});

const promotion = mongoose.model('Promotion', PromotionSchema);
module.exports = promotion;
