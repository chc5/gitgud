const User = require('../database/models/user');
const Promotion = require('../database/models/promotion');
const RolesConfig = require('../database/models/roleConfig');
const Roles = require('./roleCheck');

const createPromotion = (req, res) => {
  Roles.checkRole(req, {promotion:["create"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    if (req.user.role === RolesConfig.SU.name) {
      return res.status(200).json({msg:"You already have the highest role"});
    }
    let promotionInst = new Promotion({
      userId : req.user._id,
      content : req.body.content
    });
    promotionInst.save(function (err) {
      if (err) {
        return res.status(500).json({error:"Could not send promotion request"});
      }
      res.status(200).json({msg:"Sent promotion request"});
    });
  });
};

const retrievePromotionList = (req, res) => {
  Roles.checkRole(req, {promotion:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Promotion.find({}).populate("userId", "username role").exec(function(err, results){
      if (err || !results) {
        return res.status(404).json({error:"Unable to retrieve promotion requests"});
      }
      if (results) {
        res.status(200).json({promotionList:results});
      }
    });
  });
};

const approvePromotion = (req, res) => {
  Roles.checkRole(req, {promotion:["approve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Promotion.findOneAndDelete({_id:req.params.promotionId}).populate("userId", "role").exec(function(err, result){
      if (err || !result) {
        return res.status(500).json({error:"Unable to approve promotion"});
      }
      if (result) {
        const updateValue = {role:RolesConfig.OU.name};
        if ( result.userId.role === RolesConfig.OU.name ) {
          updateValue.role = RolesConfig.SU.name;
        }
        User.updateOne({_id:result.userId._id}, updateValue, function(updateErr, updateResult){
          if (updateErr) {
            return res.status(500).json({error:"Unable to approve promotion"});
          }
          res.status(200).json({msg:"Approved user promotion"});
        }); 
      }
    });
  });
};

const denyPromotion = (req, res) => {
  Roles.checkRole(req, {promotion:["deny"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Promotion.deleteOne({_id:req.params.promotionId}, function(err, result){
      if (err) {
        return res.status(500).json({error:"Unable to delete promotion request"});
      }
      res.status(200).json({msg:"Denied user promotion"});
    });
  });
};

const promoteUser = (req, res) => {
  Roles.checkRole(req, {promotion:["approve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    User.findOne({_id:req.params.userId}, function(err, result){
      if (err || !result) {
        return res.status(500).json({error:"Unable to promote user"});
      }
      if (result) {
        if ( result.role === RolesConfig.SU.name ) {
          return res.status(200).json({msg:"They are already the highest role"});
        }
        const updateValue = {role:RolesConfig.OU.name};
        if ( result.role === RolesConfig.OU.name ) {
          updateValue.role = RolesConfig.SU.name;
        }
        User.updateOne({_id:req.params.userId}, updateValue, function(updateErr, updateResult){
          if (err) {
            return res.status(500).json({error:"Unable to promote user"});  
          }
          res.status(200).json({msg:"Promoted user"});
        });
      }
    });
  });
};
const demoteUser = (req, res) => {
  Roles.checkRole(req, {promotion:["deny"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    User.findOne({_id:req.params.userId}, function(err, result){
      if (err || !result) {
        return res.status(500).json({error:"Unable to demote user"});
      }
      if (result) {
        if ( result.role === RolesConfig.GU.name ) {
          return res.status(200).json({msg:"They are already the lowest role"});
        }
        const updateValue = {role:RolesConfig.OU.name};
        if ( result.role === RolesConfig.OU.name ) {
          updateValue.role = RolesConfig.GU.name;
        }
        User.updateOne({_id:req.params.userId}, updateValue, function(updateErr, updateResult){
          if (err) {
            return res.status(500).json({error:"Unable to demote user"});  
          }
          res.status(200).json({msg:"Demoted user"});
        });
      }
    });
  });
};

module.exports = {createPromotion, retrievePromotionList, approvePromotion, denyPromotion, demoteUser, promoteUser};
