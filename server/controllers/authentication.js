const User = require('../database/models/user');

const signup  = (req, res) => {
  let userinst = new User({
    username: req.body.user,
    password: req.body.pass
  });
  userinst.save(function (err) {
    if (err) {
      console.log('Couldnt add user', err);
      res.send("error adding user");
    }
    else {
      console.log('Successfully added user');
      res.send("added user");
    }
  });
};

const login = (req, res) => {
  const {user, pass} = req.body;
  User.findOne({username:user}, function (err, existingUser){
    if (err || !existingUser) {
      return res.status(401).send(err || {error: "User not found"});
      // for login testing purposes, this is not good xd
    }
    if (existingUser) {
      existingUser.checkPassword(pass, function(err, match) {
        if (err || !match) {
          return res.status(401).send(err || {error: "Invalid pass"});
        }
        res.send("Correct log in");
      });
    }
    else {
      res.send("how did you see this");
    }
  });
};

module.exports = {signup, login};
