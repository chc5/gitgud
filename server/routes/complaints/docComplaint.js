const express = require('express');
const router = express.Router();
const complaintController = require('../../controllers/complaintHandler');
const authenticationControllers = require('../../controllers/authentication');

router.post('/create', authenticationControllers.checkAuthenticated, complaintController.createDocComplaint);
router.post('/retrieve/:complaintId', complaintController.retrieveDocComplaint);
router.post('/retrieveAll', complaintController.retrieveDocComplaintList);
router.post('/retrieveForDoc', complaintController.retrieveDocComplaintsForDoc);
router.post('/process/:complaintId', authenticationControllers.checkAuthenticated, complaintController.processDocComplaint);
router.post('/delete/:complaintId', authenticationControllers.checkAuthenticated, complaintController.deleteDocComplaint);

module.exports = router;
