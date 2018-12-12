const mongoose = require('mongoose');
mongoose.promise = Promise;
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name : {type: String, required:true},
  resource : {
    type : Map,
    of: [String]
  }
});

const roles = mongoose.model('Roles', RoleSchema);
module.exports = roles;
