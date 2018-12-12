const RoleConfig = require('../database/models/roleConfig');
const User = require('../database/models/user');

const getRoleFromString = (roleString) => {
  if (roleString === RoleConfig.OU.name) {
    return RoleConfig.OU;
  }
  if (roleString === RoleConfig.SU.name) {
    return RoleConfig.SU;
  }
  return RoleConfig.GU;
};

const checkRole = (req, permissions, cb) => {
  if (!req.user) {
    return cb({status:403, info:"Your role has insufficient privilege"});
  }
  const userId = req.user._id;
  User.findOne({_id:userId}, "username role", function(err, result){
    if (err) {
      return cb({status:500, info:"Could not verify role"});
    }
    const userRole = getRoleFromString(result.role);
    for (const scope in permissions) {
      const userRoleResource = userRole.resource[scope];
      for (const requested of permissions[scope]) {
        if (userRoleResource.indexOf(requested) < 0) {
          return cb({status:403, info:"Your role has insufficient privilege"});
        }
      }
    }
    return cb(null);
  });
}

module.exports = {checkRole};
