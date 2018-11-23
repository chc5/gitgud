const DocComplaint = require('../database/models/docComplaint');
const UserComplaint = require('../database/models/userComplaint');
const authentication = ('../authentication');

const createDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    let doccomplaintinst = new DocComplaint({
      text: req.body.text,
      fromId: req.body.fromId,
      revisionId: req.body.revisionId,
      docId: req.body.docId 
    });
    
    doccomplaintinst.save(function (err, doccomp) {
      if (err) {
        res.status(500).json({error:"Could not create the Document Complaint."});
      }
      else {
        console.log("Document Complaint saved to DocComplaints collection.");
        res.status(200).json({msg:"Document Complaint Created."});
      }
    });
  }
}

const retrieveDocComplaint = (req, res) => {
  DocComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err) {
      res.status(500).json({error:"Could not retrieve the Document Complaint."});
    }
    res.status(200).json({docComplaint:result});
};

const getDocComplaintList = (req, res) => {
  DocComplaint.find({}, function(err, results){
    if (err) {
      res.status(500).json({error:"Could not retrieve Document Complaints."});
    }
    res.status(200).json({docComplaintList:results});
  });
};

const deleteDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    DocComplaint.deleteOne({_id:req.params.complaintId}, function(err){
      if (err) {
        res.status(500).json({error:"Could not delete the Document Complaint."});
      }
      else {
        res.status(200).json({msg:"Document Complaint Deleted."});
      }
    });
  }
}

const createUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    let usercomplaintinst = new UserComplaint({
      text: req.body.text,
      fromId: req.body.fromId,
      targetUserId: req.body.targetUserId 
    });
    
    usercomplaintinst.save(function (err, usercomp) {
      if (err) {
        res.status(500).json({error:"Could not create the User Complaint."});
      }
      else {
        console.log("User Complaint saved to UserComplaints collection.");
        res.status(200).json({msg:"User Complaint Created."});
      }
    });
  }
}

const retrieveUserComplaint = (req, res) => {
  UserComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err) {
      res.status(500).json({error:"Could not retrieve the user complaint."});
    }
    res.status(200).json({userComplaint:result});
};

const getUserComplaintList = (req, res) => {
  UserComplaint.find({}, function(err, results){
    if (err) {
      res.status(500).json({error:"Could not retrieve User Complaints."});
    }
    res.status(200).json({userComplaintList:results});
  });
};

const deleteUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    UserComplaint.deleteOne({_id:req.params.complaintId}, function(err){
      if (err) {
        res.status(500).json({error:"Could not delete the User Complaint."});
      }
      else {
        res.status(200).json({msg:"User Complaint Deleted."});
      }
    });
  }
}

module.exports = {createDocComplaint, retrieveDocComplaint, getDocComplaintList, deleteDocComplaint, createUserComplaint, retrieveUserComplaint, getUserComplaintList, deleteUserComplaint};
