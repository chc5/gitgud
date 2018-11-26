const DocComplaint = require('../database/models/docComplaint');
const UserComplaint = require('../database/models/userComplaint');
const authentication = require('../authentication');

const createDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    let doccomplaintinst = new DocComplaint({
      content: req.body.text,
      fromUserId: req.user._id,
      revisionId: req.body.revisionId,
      docId: req.body.documentId 
    });
    
    doccomplaintinst.save(function (err, docComplaint) {
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
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve the Document Complaint."});
    }
    else {
      res.status(200).json({docComplaint:result});
    }
  });
};

const retrieveDocComplaintList = (req, res) => {
  DocComplaint.find({}, function(err, results){
    if (err || !results) {
      res.status(404).json({error:"Could not retrieve Document Complaints."});
    }
    else {
      res.status(200).json({docComplaintList:results});
    }
  });
};

const deleteDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
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

const retrieveDocComplaintsForDoc = (req, res) => {
  const docComplaintsQuery = {docId:req.body.documentId};
  if (!req.body.getProcessed || req.body.getProcessed==="false") {
    docComplaintsQuery.processed = false;
  }
  DocComplaint.find(docComplaintsQuery, function(err, results){
    if (err || !results) {
      res.status(404).json({error:"Could not retrieve Document Complaints."});
    }
    else {
      res.status(200).json({docComplaintList:results});
    }
  });
}

const processDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    DocComplaint.updateOne({_id: req.params.complaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the Document Complaint."});
      }
      else {
        console.log("Document Complaint in DocComplaint collection updated.");
        res.status(200).json({msg:"Document Complaint processed."});
      }
    });
  }
}

const createUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    let usercomplaintinst = new UserComplaint({
      content: req.body.text,
      fromUserId: req.user._id,
      targetUserId: req.body.targetUserId 
    });
    
    usercomplaintinst.save(function (err, userComplaint) {
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
    if (err || !result) {
      res.status(404).json({error:"Could not retrieve the user complaint."});
    }
    else {
      res.status(200).json({userComplaint:result});
    }
  });
};

const retrieveUserComplaintList = (req, res) => {
  UserComplaint.find({}, function(err, results){
    if (err || !results) {
      res.status(404).json({error:"Could not retrieve User Complaints."});
    }
    else {
      res.status(200).json({userComplaintList:results});
    }
  });
};

const deleteUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
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
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    UserComplaint.updateOne({_id: req.params.complaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the User Complaint."});
      }
      else {
        console.log("User Complaint in UserComplaint collection updated.");
        res.status(200).json({msg:"User Complaint processed."});
      }
    });
  }
}

const retrieveCurrentUserComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    const currUsrComplaintsQuery = {targetUserId:req.user._id};
    if (!req.body.getProcessed || req.body.getProcessed==="false") {
      currUsrComplaintsQuery.processed = false;
    }
    UserComplaint.find(currUsrComplaintsQuery, function(err, results) {
      if (err || !results) {
        res.status(404).json({error:"Could not retrieve current User Complaints."});
      }
      else {
        res.status(200).json({userComplaintList:results});
      }
    });
  }
}

const retrieveCurrentUserSentComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    const currUsrSentComplaintsQuery = {fromUserId:req.user._id};
    if (!req.body.getProcessed || req.body.getProcessed==="false") {
      currUsrSentComplaintsQuery.processed = false;
    }
    UserComplaint.find(currUsrSentComplaintsQuery, function(err, results) {
      if (err || !results) {
        res.status(404).json({error:"Could not retrieve User Complaints sent by current User."});
      }
      else {
        res.status(200).json({userComplaintList:results});
      }
    });
  }
}

module.exports = {createDocComplaint, retrieveDocComplaint, retrieveDocComplaintList,
  deleteDocComplaint, retrieveDocComplaintsForDoc, processDocComplaint, createUserComplaint, retrieveUserComplaint, retrieveUserComplaintList, deleteUserComplaint, processUserComplaint, retrieveCurrentUserComplaints, retrieveCurrentUserSentComplaints};
