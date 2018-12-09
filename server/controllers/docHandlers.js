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
      locked: false,
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
  Doc.findOne({_id:req.params.documentId}).populate({
      path:"revisions", select:"modifier_id date_created",
      populate:{
        path:"modifier_id", select:"username"
      }
  })
  .exec(function(err, result){
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
    Taboo.findAllTabooWords(req.body.textField.toLowerCase(), function(tabooErr, tabooWords){
      if (tabooErr) {
        res.status(500).json({error:"Unable to save this document"});
      }
      else {
        if (tabooWords.length != 0) {
          res.status(403).json({error:"Document contains taboo : " + tabooWords.join()});
        }
        else {
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

module.exports = {createDoc, retrieveDoc, retrieveDocList, updateDoc, deleteDoc};
