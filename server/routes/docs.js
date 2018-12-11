const express = require('express');
const router = express.Router();
const docControllers = require('../controllers/docHandlers');
const authenticationControllers = require('../controllers/authentication');

router.post('/create', authenticationControllers.checkAuthenticated, docControllers.createDoc);
router.post('/retrieve/:documentId', docControllers.retrieveDoc);
router.post('/retrieveAll', docControllers.retrieveDocList);
router.post('/lock/:documentId', authenticationControllers.checkAuthenticated, docControllers.lockDoc);
router.post('/unlock/:documentId', authenticationControllers.checkAuthenticated, docControllers.unlockDoc);
router.post('/update/:documentId', authenticationControllers.checkAuthenticated, docControllers.updateDoc);
router.post('/delete/:documentId', authenticationControllers.checkAuthenticated, docControllers.deleteDoc);

module.exports = router;
