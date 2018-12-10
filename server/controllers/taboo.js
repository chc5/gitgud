const Doc = require('../database/models/doc');
const Taboo = require('../database/models/taboo');
const authentication = require('../authentication');

const createTaboo = (req, res) => {
  let tabooInst = new Taboo({
    word: req.body.word.toLowerCase(),
    suggesterId: req.user._id
  });
  tabooInst.save(function (err, taboo){
    if (err) {
      res.status(500).json({error:"Unable to create taboo"});
    }
    else {
      console.log(taboo.word + " aded to Taboo");
      res.status(200).json({msg:"Taboo created"});
    }
  });
};
const approveTaboo = (req, res) => {
  // add admin check
  Taboo.updateOne({_id:req.params.tabooId}, {approverId:req.user._id}, function(err, result){
    if (err) {
      res.status(500).json({error:"Unable to approve Taboo word"});
    }
    else {
      res.status(200).json({msg:"Taboo word has been approved"});
    }
  });
};
const retrieveApprovedTaboo = (req, res) => {
  Taboo.find({approverId:{$ne:null}}, function(err, results){
    if (err || !results) {
      return res.status(404).json({error:"Unable to retrieve taboo words"});
    }
    if (results) {
      res.status(200).json({tabooList:results});
    }
  });
};
const retrieveUnapprovedTaboo = (req, res) => {
  Taboo.find({approverId:null}, function(err, results){
    if (err || !results) {
      return res.status(404).json({error:"Unable to retrieve unapproved taboo words"});
    }
    if (results) {
      res.status(200).json({tabooList:results});
    }
  });
};
const deleteTaboo = (req, res) => {
  // add admin check
  Taboo.deleteOne({_id:req.params.tabooId}, function(err){
    if (err) {
      res.status(500).json({error:"Unable to remove Taboo word"});
    }
    else {
      res.status(200).json({msg:"Taboo word has been removed"});
    }
  });
};

module.exports = {createTaboo, retrieveApprovedTaboo, retrieveUnapprovedTaboo, approveTaboo, deleteTaboo};
