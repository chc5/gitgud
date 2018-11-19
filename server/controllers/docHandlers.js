const Doc = require('../database/models/doc');
const Taboo = require('../database/models/taboo');
const authentication = ('../authentication');

const createDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
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
        res.send("Could not create doc");
      }
      else {
        console.log(doc.title + " saved to Document collection.");
        res.send("Doc created");     
      }
    });
  }
};
const retrieveDoc = (req, res) => {
  Doc.findOne({_id:req.params.documentId}, function(err, result){
    if (err) {
      res.send("Could not retrieve document");
    }
    res.json(result);
  });
};

const getDocList = (req, res) => {
  Doc.find({}, function(err, results){
    if (err) {
      res.send("Could not retrieve documents");
    }
    res.json({documentList:results});
  });
};

const updateDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    // push entire text field into revisions array
    // TODO : change in future to only store changes
    Doc.updateOne({_id:req.params.documentId}, { $push: {revisions:req.body.textField}}, function(err, result){
      if (err) {
        res.send("Could not update doc");
      }
      else {
        res.send("Updated doc");
      }
    });
  }
};
const deleteDoc = (req, res) => {
  if(!req.isAuthenticated()){
    res.redirect('/');
  }
  else {
    // TODO: only delete if user owns document?
    Doc.deleteOne({_id:req.params.documentId}, function(err){
      if (err) {
        res.send("Could not delete doc");
      }
      else {
        res.send("Deleted doc");
      }
    });
  }
}
module.exports = {createDoc, retrieveDoc, getDocList, updateDoc, deleteDoc};
