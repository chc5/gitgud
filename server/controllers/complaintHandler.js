const DocComplaint = require('../database/models/docComplaint');
const UserComplaint = require('../database/models/userComplaint');
const authentication = require('../authentication');
const Roles = require('./roleCheck');

const createDocComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-create"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
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
  });
}

const retrieveDocComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    DocComplaint.findOne({_id:req.params.complaintId}).populate("docId", "title").populate("fromUserId", "username").exec(function(err, result){
      if (err || !result) {
        res.status(404).json({error:"Could not retrieve the Document Complaint."});
      }
      else {
        res.status(200).json({docComplaint:result});
      }
    });
  });
};

const retrieveDocComplaintList = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    DocComplaint.find({}).populate("docId", "owner_id title").populate("fromUserId", "username").exec(function(err, results){
      if (err || !results) {
        res.status(404).json({error:"Could not retrieve Document Complaints."});
      }
      else {
        const ownedDocuments = [];
        for (const document of results) {
          if (req.user._id.equals(document.docId.owner_id)) {
            ownedDocuments.push(document);
          }
        }
        res.status(200).json({docComplaintList:ownedDocuments});
      }
    });
  });
};

const deleteDocComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-delete"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    DocComplaint.deleteOne({_id:req.params.complaintId}, function(err){
      if (err) {
        res.status(500).json({error:"Could not delete the Document Complaint."});
      }
      else {
        res.status(200).json({msg:"Document Complaint Deleted."});
      }
    });
  });
}

const retrieveDocComplaintsForDoc = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
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
  });
}

const processDocComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["doc-process"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    DocComplaint.updateOne({_id: req.params.complaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the Document Complaint."});
      }
      else {
        console.log("Document Complaint in DocComplaint collection updated.");
        res.status(200).json({msg:"Document Complaint processed."});
      }
    });
  });
}

const createUserComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["user-create"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
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
  });
}

const retrieveUserComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["user-retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    UserComplaint.findOne({_id:req.params.complaintId}).populate("fromUserId", "username").populate("targetUserId", "username").exec(function(err, result){
      if (err || !result) {
        res.status(404).json({error:"Could not retrieve the user complaint."});
      }
      else {
        res.status(200).json({userComplaint:result});
      }
    });
  });
};

const retrieveUserComplaintList = (req, res) => {
  Roles.checkRole(req, {complaint:["user-retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    UserComplaint.find({}).populate("fromUserId", "username").populate("targetUserId", "username").exec(function(err, results){
      if (err || !results) {
        res.status(404).json({error:"Could not retrieve User Complaints."});
      }
      else {
        res.status(200).json({userComplaintList:results});
      }
    });
  });
};

const deleteUserComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["user-delete"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    UserComplaint.deleteOne({_id:req.params.complaintId}, function(err){
      if (err) {
        res.status(500).json({error:"Could not delete the User Complaint."});
      }
      else {
        res.status(200).json({msg:"User Complaint Deleted."});
      }
    });
  });
}

const processUserComplaint = (req, res) => {
  Roles.checkRole(req, {complaint:["user-process"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    UserComplaint.updateOne({_id: req.params.complaintId}, {processed: true}, function(err, result) {
      if(err){
        res.status(500).json({error:"Could not process the User Complaint."});
      }
      else {
        console.log("User Complaint in UserComplaint collection updated.");
        res.status(200).json({msg:"User Complaint processed."});
      }
    });
  });
}

const retrieveCurrentUserComplaints = (req, res) => {
  // is this function necessary?
  const currUsrComplaintsQuery = {targetUserId:req.user._id};
  if (!req.body.getProcessed || req.body.getProcessed==="false") {
    currUsrComplaintsQuery.processed = false;
  }
  UserComplaint.find(currUsrComplaintsQuery).populate("fromUserId", "username").exec(function(err, results) {
    if (err || !results) {
      res.status(404).json({error:"Could not retrieve current User Complaints."});
    }
    else {
      res.status(200).json({userComplaintList:results});
    }
  });
}

const retrieveCurrentUserSentComplaints = (req, res) => {
  // is this function necessary?
  const currUsrSentComplaintsQuery = {fromUserId:req.user._id};
  if (!req.body.getProcessed || req.body.getProcessed==="false") {
    currUsrSentComplaintsQuery.processed = false;
  }
  UserComplaint.find(currUsrSentComplaintsQuery).populate("targetUserId", "username").exec(function(err, results) {
    if (err || !results) {
      res.status(404).json({error:"Could not retrieve User Complaints sent by current User."});
    }
    else {
      res.status(200).json({userComplaintList:results});
    }
  });
}

module.exports = {createDocComplaint, retrieveDocComplaint, retrieveDocComplaintList,
  deleteDocComplaint, retrieveDocComplaintsForDoc, processDocComplaint, createUserComplaint, retrieveUserComplaint, retrieveUserComplaintList, deleteUserComplaint, processUserComplaint, retrieveCurrentUserComplaints, retrieveCurrentUserSentComplaints};
