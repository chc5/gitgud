const userProfile = require('../database/models/userProfile');
const authentication = require('../authentication');

const createUserProfile = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    let userProfInst = new userProfile({
      summary: req.body.summary,
      userId: req.user._id
    });
    userProfInst.save(function (err, profile) {
      if(err) {
        res.status(500).json({error:"Unable to create user profile"});
      }
      else{
        res.status(200).json({msg:"Profile created"});
      }
    });
  }
};

const updateProfile = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    userProfile.findOne({userId:req.user._id}, function(err, profile){
      if(err){
        res.status(500).json({error:"Unable to find Profile"});
      }
      else{
        profile.summary = req.body.summary;
        profile.save(function (profSaveErr, savedProfile){
          if(profSaveErr){
            res.status(500).json({error:"Failed to update profile"});
          }
          else{
            res.status(200).json({msg:"Profile updated"});
          }
        });   
      }
    });
  }
};

const retrieveProfile = (req, res) => { 
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    userProfile.findOne({userId:req.user._id}, function(err, profileData){
      if(err){
        res.status(500).json({error:"Unable to find Profile"});
      }
      else{
        res.status(200).json({profile:profileData});
      }
    });
  }
};

const deleteProfile = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    userProfile.deleteOne({userId:req.user._id}, function(err){
      if(err){
        res.status(500).json({error:"Unable to delete profile"});
      }
      else{
        res.status(200).json({msg:"Profile deleted"});
      }
    });
  }
};

module.exports = {createUserProfile, updateProfile, retrieveProfile, deleteProfile};
