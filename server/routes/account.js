const express = require('express');
const router = express.Router();
const authenticationControllers = require('../controllers/authentication');
const authentication = require('../authentication');

router.post('/login', authenticationControllers.login);
router.get('/logout', authenticationControllers.logout);
router.post('/signup', authenticationControllers.signup);

module.exports = router;
