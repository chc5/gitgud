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
      return res.status(401).json({error: "Unable to signup user"});
    }
    // Register user if it does not exist
    if (!existingUser) {
      userinst.save(function (err) {
        if (err) {
          console.log('Couldnt add user', err);
          res.status(500).json({error:"Unable to signup user"});
        }
        else {
          console.log('Successfully added user');
          res.status(200).json({msg:"You have successfully signed up. Please log in."});
        }
      });
    }
  });
};

const login = (req, res, next) => {
  // callback is passed into done of local strategy callback
  authentication.authenticate('local', function(err, user, info){
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({error:info.error});
    }
    req.login(user, function(loginErr){
      if (loginErr) {
        return next(loginErr);
      }
      console.log("log in status of " + req.user.username + " is " + req.isAuthenticated());
      return res.status(200).json({
        userInfo:{  
          username:req.user.username
        }
      });
    });
  })(req, res, next);
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

const checkAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    next();
  }
};
module.exports = {signup, login, logout, checkAuthenticated};
