const express = require('express');
const router = express.Router();
const tabooControllers = require('../controllers/taboo');
const authenticationControllers = require('../controllers/authentication');

router.post('/create', authenticationControllers.checkAuthenticated, tabooControllers.createTaboo);
router.post('/approve/:tabooId', authenticationControllers.checkAuthenticated, tabooControllers.approveTaboo);
router.post('/retrieveApproved', tabooControllers.retrieveApprovedTaboo);
router.post('/retrieveUnapproved', tabooControllers.retrieveUnapprovedTaboo);
router.post('/delete/:tabooId', authenticationControllers.checkAuthenticated, tabooControllers.deleteTaboo);

module.exports = router;
