const authentication = require('../authentication');
/*
const Roles = require('../database/models/roles');
const roleconfig = require('../database/models/roleConfig');
const GU = roleconfig.GU;
const OU = roleconfig.OU;
const SU = roleconfig.SU;
for (const role of [GU, OU, SU]) {
  console.log(role);
  const addRole = new Roles(role);
  addRole.save(function(err, doc){
    console.log(doc);    
  });
}
*/
/*
const gu = new Roles(roleconfig.GU);
const ou = new Roles(roleconfig.OU);
const su = new Roles(roleconfig.SU);
gu.save(function(err, doc) {
  console.log(doc);
});
*/
exports.getTesting = (req, res) => res.status(200).send("logged in == " + req.isAuthenticated());

