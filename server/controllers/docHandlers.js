const Doc = require('../database/models/doc');
const Taboo = require('../database/models/taboo');
const authentication = require('../authentication');
const Revision = require('../database/models/revision');

const createDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    let docinst = new Doc({
      title: req.body.title,
      content: req.body.content,
      original_content: req.body.content,
      owner_id: req.user._id,
    });

    docinst.save(function (err, doc) {
      if (err) {
        res.status(500).json({error:"Unable to create this document"});
      }
      else {
        console.log(doc.title + " saved to Document collection.");
        res.status(200).json({msg:"Document created"});     
      }
    });
  }
};

const retrieveDoc = (req, res) => {
  Doc.findOne({_id:req.params.documentId}, function(err, result){
    if (err || !result) {
      return res.status(404).json({error:"Unable to retrieve your document"});
    }
    if (result) {
      if (req.body.revisionId) {
        result.getVersion(req.body.revisionId, function(versionErr, versionResult) {
          if (versionErr || !versionResult) {
            return res.status(404).json(versionErr);
          }
          if (versionResult) {
            result.content = versionResult.changes
            res.status(200).json({document:result});
          }
        });
      }
      else {
        res.status(200).json({document:result});
      }
    }
  });
};

const lockDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr || lockresult.locked) {
        return res.status(403).json({error:"Another user is currently making changes to the document"});
      }
      Doc.updateOne({_id:req.params.documentId}, {locked: req.user._id}, function(err, result){
        if(err) {
          return res.status(500).json({error:"Failed to lock document"});
        }
        res.status(200).json({msg:"Locked document successfully"});
      });
    });
  }
}

const unlockDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr || (lockresult.locked != req.user._id && lockresult.owner_id != req.user._id)) {
        return res.status(403).json({msg:"You are not the user that currently has the lock"});
      }
      Doc.updateOne({_id:req.params.documentId}, {locked: null}, function(err, result){
        if(err) {
          return res.status(500).json({error:"Failed to unlock document"});
        }
        res.status(200).json({msg:"Unlocked document successfully"});
      });
    });
  }
}

const retrieveDocList = (req, res) => {
  Doc.find({}, function(err, results){
    if (err || !results) {
      return res.status(404).json({error:"Unable to retrieve your documents"});
    }
    if (results) {
      res.status(200).json({documentList:results});
    }
  });
};

const updateDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    // add entire text field into revision collection
    // push revision id to revisions array
    // TODO : change in future to only store changes
    let revisionInst = new Revision({
      doc_id: req.params.documentId,
      changes: req.body.textField,
      modifier_id: req.user._id
    });
    revisionInst.save(function(err, revision){
      if (err) {
        res.status(500).json({error:"Unable to save this document"});
      }
      else {
        Doc.updateOne({_id:revision.doc_id}, { $push:{revisions:revision._id}, content:req.body.textField}, function(docErr, result){
          if (docErr) {
            res.status(500).json({error:"Unable to save this document"});
            Revision.deleteOne({_id:revision._id}, function(err){
              if (err) {
                console.log("Error deleting revision after failed update");
              }
            });
          }
          else {
            res.status(200).json({msg:"Document has been saved"});
          }
        });
      }
    });
  }
};

const deleteDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    // TODO: only delete if user owns document?
    Doc.findOneAndDelete({_id:req.params.documentId}, function(err, document){
      if (err) {
        res.status(500).json({error:"Unable to delete this document"});
      }
      else {
        Revision.deleteMany({_id:{$in:document.revisions}}, function(err){
          if (err) {
            console.log("Error deleting revisions after document deletion");
          }
        }); 
        res.status(200).json({msg:"Document has been deleted"});
      }
    });
  }
};

module.exports = {createDoc, retrieveDoc, lockDoc, unlockDoc, retrieveDocList, updateDoc, deleteDoc};
