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
      owner_id: req.user._id,
    });
    docinst.save(function (err, doc) {
      if (err) {
        res.status(500).json({error:"Unable to create this document"});
      }
      else {
        req.params.documentId = doc._id;
        req.body.textField = doc.content;
        console.log(doc.title + " saved to Document collection.");
        updateDoc(req, res);
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
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(lockResult.locked) {
        return res.status(403).json({error:"Another user is currently making changes to the document"});
      }
      lockResult.locked = req.user._id;
      lockResult.save(function (err, doc) {
        if (err) {
          res.status(500).json({error:"Failed to lock document"});
        }
        else {
          res.status(200).json({msg:"Document locked"});     
        }
      });
    });
  }
};

const unlockDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else{
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(lockresult.locked != req.user._id && lockresult.owner_id != req.user._id) {
        return res.status(403).json({error:"You are not the user that currently has the lock"});
      }
      lockResult.locked = null;
      lockResult.save(function (err, doc) {
        if (err) {
          res.status(500).json({error:"Failed to unlock document"});
        }
        else {
          res.status(200).json({msg:"Document unlocked"});     
        }
      });
    });
  }
};

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
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(lockresult.locked) {
        return res.status(403).json({error:"Another user is currently making changes to the document"});
      }
      Taboo.findAllTabooWords(req.body.textField.toLowerCase(), function(tabooErr, tabooWords){
        if (tabooErr) {
          res.status(500).json({error:"Unable to save this document"});
        }
        else {
          if (tabooWords.length != 0) {
            return res.status(403).json({error:"Document contains taboo : " + tabooWords.join()});
          }
          revisionInst.save(function(err, revision){
            if (err) {
              res.status(500).json({error:"Unable to save this document"});
            }
            else {
              lockResult.content = req.body.textField;
              lockResult.revisions.push(revision._id);
              lockResult.save(function (err, doc) {
                if (err) {
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
      });
    });
  }
};


const deleteDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.status(401).json({error:"Must be logged in to perform this action"});
  }
  else {
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(lockResult.owner_id != req.user._id) {
        return res.status(403).json({error:"You are not the owner of the document"});
      }
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
  }
};

module.exports = {createDoc, retrieveDoc, lockDoc, unlockDoc, retrieveDocList, updateDoc, deleteDoc};
