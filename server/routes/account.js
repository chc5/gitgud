const express = require('express');
const router = express.Router();
const authenticationControllers = require('../controllers/authentication');
const authentication = require('../authentication');

router.post('/login', authentication.authenticate('local'), authenticationControllers.login);
router.get('/logout', authenticationControllers.logout);
router.post('/signup', authenticationControllers.signup);

module.exports = router;
