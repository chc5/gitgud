const express = require('express');
const router = express.Router();
const tabooControllers = require('../controllers/taboo');

router.post('/create', tabooControllers.createTaboo);
router.post('/approve/:tabooId', tabooControllers.approveTaboo);
router.post('/retrieveApproved', tabooControllers.retrieveApprovedTaboo);
router.post('/retrieveUnapproved', tabooControllers.retrieveUnapprovedTaboo);
router.post('/delete:tabooId', tabooControllers.deleteTaboo);

module.exports = router;
