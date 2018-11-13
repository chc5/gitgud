const User = require('../database/models/user');

/*
 * Retrieves username and password from request
 * and registers User to db
 */
const signup  = (req, res) => {
  let userinst = new User({
    username: req.body.userName,
    password: req.body.password
  });
  // Check if username exists in db
  User.findOne({username:userinst.username}, function (err, existingUser){
    if (err || existingUser) {
      return res.status(401).send(err || {error: "User already exists"});
    }
    // Register user if it does not exist
    if (!existingUser) {
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
    }
    else {
      res.send("how did you see this");
    }
  });
};

/*
 * Retrieves username and password from request
 * Checks if username exists
 * Checks if given password matches password from db
 */
const login = (req, res) => {
  const {userName, password} = req.body;
  // Check if username exists in db
  User.findOne({username:userName}, function (err, existingUser){
    if (err || !existingUser) {
      return res.status(401).send(err || {error: "User not found"});
      // for login testing purposes, this is not good xd
    }
    if (existingUser) {
      // username exists, so check if password matches
      existingUser.checkPassword(password, function(err, match) {
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
