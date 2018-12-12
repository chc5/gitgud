const express = require('express');
const router = express.Router();
const promotionControllers = require('../controllers/promotion');

router.post('/create', promotionControllers.createPromotion);
router.post('/retrieveAll', promotionControllers.retrievePromotionList);
router.post('/approve/:promotionId', promotionControllers.approvePromotion);
router.post('/deny/:promotionId', promotionControllers.denyPromotion);
router.post('/promote/:userId', promotionControllers.promoteUser);
router.post('/demote/:userId', promotionControllers.demoteUser);

module.exports = router;
