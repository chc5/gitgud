const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');

router.post('/login', authentication.login);
router.post('/signup', authentication.signup);

module.exports = router;
