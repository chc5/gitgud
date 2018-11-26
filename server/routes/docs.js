const express = require('express');
const router = express.Router();
const docControllers = require('../controllers/docHandlers');

router.post('/create', docControllers.createDoc);
router.post('/retrieve/:documentId', docControllers.retrieveDoc);
router.post('/retrieveAll', docControllers.retrieveDocList);
router.post('/update/:documentId', docControllers.updateDoc);
router.post('/delete/:documentId', docControllers.deleteDoc);

module.exports = router;
