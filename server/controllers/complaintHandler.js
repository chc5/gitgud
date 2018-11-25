const DocComplaint = require('../database/models/docComplaint');
const UserComplaint = require('../database/models/userComplaint');
const authentication = require('../authentication');

const createDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    let doccomplaintinst = new DocComplaint({
      text: req.body.text,
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

const retrieveDocComplaint = (req, res) => {
  DocComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err || !result) {
      res.status(500).json({error:"Could not retrieve the Document Complaint."});
    }
    res.status(200).json({docComplaint:result});
  });
};

const getDocComplaintList = (req, res) => {
  DocComplaint.find({}, function(err, results){
    if (err || !result) {
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

const retrieveUnprocessedDocComplaints = (req, res) => {
  DocComplaint.find({processed: false}, function(err, results){
    if (err || !result) {
      res.status(500).json({error:"Could not retrieve Unprocessed Document Complaints."});
    }
    res.status(200).json({unprocessedDocComplaints:results});
  });
}

const processDocComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    DocComplaint.findById(req.body.docComplaintId, function (err, result) {
      if(err || !result){
        res.status(500).json({error:"Could not retrieve the Document Complaint for updating."});
      }
      else {
        result.processed = true;
        result.save(function (saveerr, updatedresult) {
          if(saveerr || !updatedresult){
            res.status(500).json({error:"Could not update the Document Complaint."});           
          }
          else {
            console.log("Document Complaint in DocComplaints collection updated.");
            res.status(200).json({msg:"Document Complaint Updated."});
          }
        });
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

const retrieveUserComplaint = (req, res) => {
  UserComplaint.findOne({_id:req.params.complaintId}, function(err, result){
    if (err || !result) {
      res.status(500).json({error:"Could not retrieve the user complaint."});
    }
    res.status(200).json({userComplaint:result});
  });
};

const getUserComplaintList = (req, res) => {
  UserComplaint.find({}, function(err, results){
    if (err || !result) {
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

const retrieveUnprocessedUserComplaints = (req, res) => {
  UserComplaint.find({processed: false}, function(err, results){
    if (err || !result) {
      res.status(500).json({error:"Could not retrieve User Complaints."});
    }
    res.status(200).json({unprocessedUserComplaints:results});
  });
}

const processUserComplaint = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    UserComplaint.findById(req.body.userComplaintId, function (err, result) {
      if(err || !result){
        res.status(500).json({error:"Could not retrieve the User Complaint for updating."});
      }
      else {
        result.processed = true;
        result.save(function (saveerr, updatedresult) {
          if(saveerr || !updatedresult){
            res.status(500).json({error:"Could not update the User Complaint."});           
          }
          else {
            console.log("User Complaint in UserComplaints collection updated.");
            res.status(200).json({msg:"User Complaint Updated."});
          }
        });
      }
    });
  }
}

const getCurrentUserComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    UserComplaint.find({targetUserId:req.user._id}, function(err, results) {
      if (err || !result) {
        res.status(500).json({error:"Could not retrieve current User Complaints."});
      }
      res.status(200).json({currentUserComplaintList:results});
    });
  }
}

const getCurrentUserComplaints = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    UserComplaint.find({fromUserId:req.user._id}, function(err, results) {
      if (err || !result) {
        res.status(500).json({error:"Could not retrieve User Complaints sent by current User."});
      }
      res.status(200).json({currentUserComplaintList:results});
    });
  }
}

module.exports = {createDocComplaint, retrieveDocComplaint, getDocComplaintList, deleteDocComplaint, retrieveUnprocessedDocComplaints, processDocComplaint, createUserComplaint, retrieveUserComplaint, getUserComplaintList, deleteUserComplaint, retrieveUnprocessedUserComplaints, processUserComplaint, getCurrentUserComplaints, getCurrentSentUserComplaints};
