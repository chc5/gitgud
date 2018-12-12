const userProfile = require('../database/models/userProfile');
const Roles = require('./roleCheck');
const User = require('../database/models/user');

const createUserProfile = (req, res) => {
  Roles.checkRole(req, {user:["create"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    let userProfInst = new userProfile({
      summary: req.body.summary,
      userId: req.user._id,
      img: req.body.img
    });
    userProfInst.save(function (err, profile) {
      if(err) {
        console.log(err);
        res.status(500).json({error:"Unable to create user profile"});
      }
      else{
        User.updateOne({_id:req.user._id}, {hasProfile:true}, function(userErr, updated){
          if(userErr){
            res.status(500).json({error:"Failed to set profile to true after creation"});
          }
          else{
            res.status(200).json({msg:"Profile created successfully"});
          }
        });
      }
    });
  });
};

const updateProfile = (req, res) => {
  Roles.checkRole(req, {user:["update"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    userProfile.updateOne({userId:req.user._id}, {summary: req.body.summary, img: req.body.img}, function(err, profile){
      if(err){
        res.status(500).json({error:"Unable to update Profile"});
      }
      else{
        res.status(200).json({msg:"Profile updated"});
      }
    });
  });
};

const retrieveProfile = (req, res) => { 
  Roles.checkRole(req, {user:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Roles.checkRole(req, {user:["search"]}, function(roleErr){
      const queryField = {userId:req.body.userId};
      if (!req.body.userId || roleErr) {
        queryField.userId = req.user._id;
      }
      userProfile.findOne(queryField, function(err, profileData){
        if(err || !profileData){
          return res.status(404).json({error:"Unable to find Profile"});
        }
        if (profileData) {
          // check if documents are private before sending
          return res.status(200).json({profile:profileData});
        }
      });
    });
  });
};

const retrieveProfileList = (req, res) => { 
  Roles.checkRole(req, {user:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Roles.checkRole(req, {user:["search"]}, function(roleErr){
      userProfile.find({}).populate("userId", "username role").exec(function(err, profileDataList){
        if(err || !profileDataList){
          return res.status(404).json({error:"Unable to find User Profiles"});
        }
        if (profileDataList) {
          // check if documents are private before sending
          return res.status(200).json({profileList:profileDataList});
        }
      });
    });
  });
};

const deleteProfile = (req, res) => {
  Roles.checkRole(req, {user:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    userProfile.deleteOne({userId:req.user._id}, function(err){
      if(err){
        res.status(500).json({error:"Unable to delete profile"});
      }
      else{
        User.updateOne({_id:req.user._id}, {hasProfile:false}, function(userErr, updated){
          if(userErr){
            res.status(500).json({error:"Failed to set profile to false after deletion"});
          }
          else{
            res.status(200).json({msg:"Profile deleted"});
          }
        });
      }
    });
  });
};

module.exports = {createUserProfile, updateProfile, retrieveProfile, deleteProfile, retrieveProfileList};
