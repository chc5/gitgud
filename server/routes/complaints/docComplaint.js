const express = require('express');
const router = express.Router();
const complaintController = require('../../controllers/complaintHandler');

router.post('/create', complaintController.createDocComplaint);
router.post('/retrieve/:complaintId', complaintController.retrieveDocComplaint);
router.post('/retrieveAll', complaintController.retrieveDocComplaintList);
router.post('/retrieveForDoc', complaintController.retrieveDocComplaintsForDoc);
router.post('/process/:complaintId', complaintController.processDocComplaint);
router.post('/delete/:complaintId', complaintController.deleteDocComplaint);

module.exports = router;
