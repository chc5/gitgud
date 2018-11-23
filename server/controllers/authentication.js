const User = require('../database/models/user');
const authentication = require('../authentication');

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
      return res.status(401).json({error: "Unable to create this account"});
    }
    // Register user if it does not exist
    if (!existingUser) {
      userinst.save(function (err) {
        if (err) {
          console.log('Couldnt add user', err);
          res.status(500).json({error:"Unable to register user"});
        }
        else {
          console.log('Successfully added user');
          res.status(200).json({msg:"You have successfully registered. Please log in."});
        }
      });
    }
  });
};

const login = (req, res) => {
  console.log("login status for " + req.user.username + " is " + req.isAuthenticated());
  if(req.isAuthenticated()){
    res.json({
      userInfo:{  
        username:req.user.username
      }
    });
  }
  else {
    res.status(401).json({error:"Login is unsuccessful"});
  }
};
const logout = (req, res) => {
  if(req.user) {
    console.log("logged out " + req.user.username)
    req.logout();
    req.session.destroy();
    res.status(200).json({msg:"You have been logged out"});
  }
  else {
    res.status(400).json({error:"You were not logged in"});
  }
};

module.exports = {signup, login, logout};
