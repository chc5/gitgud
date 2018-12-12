const express = require('express');
const router = express.Router();
const docControllers = require('../controllers/docHandlers');

router.post('/create', docControllers.createDoc);
router.post('/retrieve/:documentId', docControllers.retrieveDoc);
router.post('/retrieveAll', docControllers.retrieveDocList);
router.post('/lock/:documentId', docControllers.lockDoc);
router.post('/unlock/:documentId', docControllers.unlockDoc);
router.post('/update/:documentId', docControllers.updateDoc);
router.post('/delete/:documentId', docControllers.deleteDoc);

router.post('/:documentId/setPrivacy', docControllers.setPrivacy);
router.post('/:documentId/inviteUser', docControllers.inviteUser);
router.post('/:documentId/removeUser', docControllers.removeUser);
module.exports = router;
