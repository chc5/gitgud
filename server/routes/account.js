const express = require('express');
const router = express.Router();
const authenticationControllers = require('../controllers/authentication');
const profileControllers = require('../controllers/profileHandler');

router.post('/login', authenticationControllers.login);
router.get('/logout', authenticationControllers.logout);
router.post('/signup', authenticationControllers.signup);

router.post('/createProfile', authenticationControllers.checkAuthenticated, profileControllers.createUserProfile);
router.post('/retrieveProfile', authenticationControllers.checkAuthenticated, profileControllers.retrieveProfile);
router.post('/retrieveProfileList', authenticationControllers.checkAuthenticated, profileControllers.retrieveProfileList);
router.post('/updateProfile', authenticationControllers.checkAuthenticated, profileControllers.updateProfile);
router.post('/deleteProfile', authenticationControllers.checkAuthenticated, profileControllers.deleteProfile);

module.exports = router;
