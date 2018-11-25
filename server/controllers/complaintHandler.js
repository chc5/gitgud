const DocComplaint = require('../database/models/docComplaint');
const UserComplaint = require('../database/models/userComplaint');
const authentication = require('../authentication');

const createDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    let doccomplaintinst = new DocComplaint({
      content: req.body.text,
      fromUserId: req.user._id,
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

const getDocComplaint = (req, res) => {
  DocComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve the Document Complaint."});
    }
    else {
      res.status(200).json({docComplaint:result});
    }
  });
};

const getDocComplaintList = (req, res) => {
  DocComplaint.find({}, function(err, results){
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve Document Complaints."});
    }
    else {
      res.status(200).json({docComplaintList:results});
    }
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

const getUnprocessedDocComplaints = (req, res) => {
  DocComplaint.find({processed: false, docId: req.body.docId}, function(err, results){
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve Unprocessed Document Complaints."});
    }
    else {
      res.status(200).json({unprocessedDocComplaints:results});
    }
  });
}

const processDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    DocComplaint.updateOne({_id: req.body.docComplaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the Document Complaint."});
      }
      else {
        console.log("Document Complaint in DocComplaint collection updated.");
        res.status(200).json({msg:"Document Complaint Updated."});
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
      content: req.body.text,
      fromUserId: req.user._id,
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

const getUserComplaint = (req, res) => {
  UserComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve the user complaint."});
    }
    else {
      res.status(200).json({userComplaint:result});
    }
  });
};

const getUserComplaintList = (req, res) => {
  UserComplaint.find({}, function(err, results){
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve User Complaints."});
    }
    else {
      res.status(200).json({userComplaintList:results});
    }
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

const processUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    UserComplaint.updateOne({_id: req.body.userComplaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the User Complaint."});
      }
      else {
        console.log("User Complaint in UserComplaint collection updated.");
        res.status(200).json({msg:"User Complaint Updated."});
      }
    });
  }
}

const getCurrentUserComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    const currUsrComplaintsQuery = {targetUserId:req.user_id};
    if (!req.body.getProcessed) {
      currUsrComplaintsQuery.processed = false;
    }
    UserComplaint.find(currUsrComplaintsquery, function(err, results) {
      if (err || !result) {
        res.status(404).json({error:"Could not retrieve current User Complaints."});
      }
      else {
        res.status(200).json({currentUserComplaintList:results});
      }
    });
  }
}

const getCurrentUserSentComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    const currUsrSentComplaintsQuery = {fromUserId:req.user_id};
    if (!req.body.getProcessed) {
      currUsrSentComplaintsQuery.processed = false;
    }
    UserComplaint.find(currUsrSentComplaintsquery, function(err, results) {
      if (err || !result) {
        res.status(404).json({error:"Could not retrieve User Complaints sent by current User."});
      }
      else {
        res.status(200).json({currentUserComplaintList:results});
      }
    });
  }
}

module.exports = {createDocComplaint, getDocComplaint, getDocComplaintList, deleteDocComplaint, getUnprocessedDocComplaints, processDocComplaint, createUserComplaint, getUserComplaint, getUserComplaintList, deleteUserComplaint, processUserComplaint, getCurrentUserComplaints, getCurrentUserSentComplaints};
