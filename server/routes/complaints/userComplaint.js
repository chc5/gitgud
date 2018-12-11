const express = require('express');
const router = express.Router();
const complaintController = require('../../controllers/complaintHandler');
const authenticationControllers = require('../../controllers/authentication');

router.post('/create', authenticationControllers.checkAuthenticated, complaintController.createUserComplaint);
router.post('/retrieve/:complaintId', complaintController.retrieveUserComplaint);
router.post('/retrieveAll', complaintController.retrieveUserComplaintList);
router.post('/retrieveForUser', authenticationControllers.checkAuthenticated, complaintController.retrieveCurrentUserComplaints);
router.post('/retrieveFromUser', authenticationControllers.checkAuthenticated, complaintController.retrieveCurrentUserSentComplaints);
router.post('/process/:complaintId', authenticationControllers.checkAuthenticated, complaintController.processUserComplaint);
router.post('/delete/:complaintId', authenticationControllers.checkAuthenticated, complaintController.deleteUserComplaint);

module.exports = router;
