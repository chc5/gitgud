const express = require('express');
const router = express.Router();
const complaintController = require('../../controllers/complaintHandler');
const docComplaintRouter = require('./docComplaint');
const userComplaintRouter = require('./userComplaint');

router.use('/docs', docComplaintRouter);
router.use('/users', userComplaintRouter);


module.exports = router;
