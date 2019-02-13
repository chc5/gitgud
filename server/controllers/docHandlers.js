const Doc = require('../database/models/doc');
const Taboo = require('../database/models/taboo');
const User = require('../database/models/user');
const authentication = require('../authentication');
const Revision = require('../database/models/revision');
const UserProfile = require('../database/models/userProfile');
const Roles = require('./roleCheck');

const createDoc = (req, res) => {
  Roles.checkRole(req, {document:["create"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
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
  });
};

const retrieveDoc = (req, res) => {
  Roles.checkRole(req, {document:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Doc.findOne({_id:req.params.documentId}).populate({
        path:"revisions", select:"modifier_id date_created",
        populate:{
          path:"modifier_id", select:"username"
        }
    })
    .populate("privacy.members", "username")
    .exec(function(err, result){
      if (err || !result) {
        return res.status(404).json({error:"Unable to retrieve your document"});
      }
      if (result) {
        if (req.body.revisionId) {
          result.getVersion(req.body.revisionId, {populated:true}, function(versionErr, versionResult) {
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
  });
};

const lockDoc = (req, res) => {
  Roles.checkRole(req, {document:["lock"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
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
  });
};

const unlockDoc = (req, res) => {
  Roles.checkRole(req, {document:["unlock"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if (!lockResult.locked) {
        return res.status(200).json({msg:"Document is already unlocked"});
      }
      Roles.checkRole(req, {document:["unlock-master"]}, function(roleErr){
        if(!req.user._id.equals(lockResult.locked) && !req.user._id.equals(lockResult.owner_id) && !roleErr ) {
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
    });
  });
};

const retrieveDocList = (req, res) => {
  Roles.checkRole(req, {document:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    // add here
    Doc.find({$or:[{"privacy.level":"PUBLIC"}, {"privacy.level":"RESTRICTED"}, {$and:[{"privacy.level":"PRIVATE"},
    {owner_id:req.user._id}]}, {$and:[{"privacy.level":"SHARED"},
    {"privacy.members":{$elemMatch:{$eq:req.user._id}}}]}, {"owner_id":req.user._id} ]}, function(err, results){
      if (err || !results) {
        return res.status(404).json({error:"Unable to retrieve your documents"});
      }
      if (results) {
        res.status(200).json({documentList:results});
      }
    });
  });
};

const searchDocList = (req, res) => {
  Roles.checkRole(req, {document:["retrieve"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    // add here
    Doc.find({$and:[{$or:[{"privacy.level":"PUBLIC"}, {"privacy.level":"RESTRICTED"}, {$and:[{"privacy.level":"PRIVATE"},
    {owner_id:req.user._id}]}, {$and:[{"privacy.level":"SHARED"},
    {"privacy.members":{$elemMatch:{$eq:req.user._id}}}]}, {"owner_id":req.user._id} ]},
    {$or:[{title:/req.body.searchTerm/i},
    {content:/req.body.content/i}]}]}, function(err, results){
      if (err || !results) {
        return res.status(404).json({error:"Unable to retrieve your documents"});
      }
      if (results) {
        res.status(200).json({documentList:results});
      }
    });
  });
};

const updateDoc = (req, res) => {
  // add entire text field into revision collection
  // push revision id to revisions array
  // TODO : change in future to only store changes
  Roles.checkRole(req, {document:["update"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    let revisionInst = new Revision({
      doc_id: req.params.documentId,
      changes: req.body.textField,
      modifier_id: req.user._id
    });
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(!req.user._id.equals(lockResult.locked) && !req.body.title) {
        return res.status(403).json({error:"You must acquire the lock before making changes to the document"});
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
                  UserProfile.findOne({userId:req.user._id}, function(profileFindErr, profile){
                    if(profileFindErr || !profile){
                      return res.status(500).json({error:"Failed to find profile"});
                    }
                    let initLowest = profile.recentDocs[0];
                    for(let i = 0; i < profile.recentDocs.length - 1; i++){
                      profile.recentDocs[i] = profile.recentDocs[i+1];
                    }
                    let idxCurr = profile.recentDocs.indexOf(lockResult._id);
                    if(idxCurr >= 0){
                      for(let j = idxCurr; j > 0; j--){
                        profile.recentDocs[j] = profile.recentDocs[j-1];
                      }
                      profile.recentDocs[0] = initLowest;
                    }
                    profile.recentDocs[2] = lockResult._id;
                    UserProfile.updateOne({userId:profile.userId}, {$set:{recentDocs:profile.recentDocs}}, function(updateErr, update){
                      if (updateErr) {
                        return res.status(500).json({error:"Failed to update profile"});
                      }
                      return res.status(200).json({msg:"Document has been saved"});
                    });
                  });
                }
              });
            }
          });
        }
      });
    });
  });
};

const deleteDoc = (req, res) => {
  Roles.checkRole(req, {document:["delete"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Doc.findOne({_id:req.params.documentId}, function(lockErr, lockResult){
      if(lockErr){
        return res.status(500).json({error:"Failed to check the lock on document"});
      }
      if(!req.user._id.equals(lockResult.owner_id)) {
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
    });
  });
};

const setPrivacy = (req, res) => {
  Roles.checkRole(req, {document:["update"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    if (req.body.privacyLevel === "PRIVATE" || req.body.privacyLevel === "PUBLIC" ||
    req.body.privacyLevel === "RESTRICTED" || req.body.privacyLevel === "SHARED") {
      return Doc.findOne({_id:req.params.documentId}, function(findErr, findResult){
        if (findErr || !findResult) {
          return res.status(500).json({error:"Could not update privacy"});
        }
        if (findResult) {
          if (!req.user._id.equals(findResult.owner_id)) {
            return res.status(403).json({error:"You do not own this document"});
          }
          findResult.privacy.level = req.body.privacyLevel;
          findResult.save(function(saveErr, saveResult){
            if (saveErr) {
              return res.status(500).json({error:"Could not update privacy"});
            }
            res.status(200).json({msg:"Document privacy updated"});
          });
        }
      });
    }
    res.status(401).json({error:"Invalid privacy level"});
  });
};

const inviteUser = (req, res) => {
  Roles.checkRole(req, {document:["update"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Doc.findOne({_id:req.params.documentId}, function(err, result){
      if (err || !result) {
        return res.status(500).json({error:"Could not add user"});
      }
      if (result) {
        if (result.privacy.level === "SHARED") {
          User.findOne({username:req.body.userId}, function(userErr, userResult){
            if (userErr || !userResult) {
              return res.status(500).json({error:"Could not add user"});
            }
            result.privacy.members.push(userResult._id);
            result.save(function(saveErr, saveResult){
              if (saveErr) {
                return res.status(500).json({error:"Could not add user"});
              }
              res.status(200).json({msg:"User invited to document"});
            });
          });
        }
        else {
          return res.status(401).json({error:"Document is not being shared"});
        }
      }
    });
  });
};

const removeUser = (req, res) => {
  Roles.checkRole(req, {document:["update"]}, function(roleErr){
    if (roleErr) {
      return res.status(roleErr.status).json({error:roleErr.info});
    }
    Doc.findOne({_id:req.params.documentId}, function(err, result){
      if (err || !result) {
        return res.status(500).json({error:"Could not remove user"});
      }
      if (result) {
        if (result.privacy.level === "SHARED") {
          const loc = result.privacy.members.indexOf(req.body.userId);
          if (loc < 0) {
            return res.status(500).json({error:"Document isn't shared with user"});
          }
          result.privacy.members = result.privacy.members.splice(loc, 1);
          result.save(function(saveErr, saveResult){
            if (saveErr) {
              return res.status(500).json({error:"Could not remove user"});
            }
            res.status(200).json({msg:"User removed document"});
          });
        }
        else {
          return res.status(301).json({error:"Document is not being shared"});
        }
      }
    });
  });
};
module.exports = {createDoc, retrieveDoc, lockDoc, unlockDoc, retrieveDocList, searchDocList, updateDoc, deleteDoc, setPrivacy, inviteUser, removeUser};
