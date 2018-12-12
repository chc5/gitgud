const express = require('express');
const router = express.Router();
const complaintController = require('../../controllers/complaintHandler');

router.post('/create', complaintController.createUserComplaint);
router.post('/retrieve/:complaintId', complaintController.retrieveUserComplaint);
router.post('/retrieveAll', complaintController.retrieveUserComplaintList);
router.post('/retrieveForUser', complaintController.retrieveCurrentUserComplaints);
router.post('/retrieveFromUser', complaintController.retrieveCurrentUserSentComplaints);
router.post('/process/:complaintId', complaintController.processUserComplaint);
router.post('/delete/:complaintId', complaintController.deleteUserComplaint);

module.exports = router;
