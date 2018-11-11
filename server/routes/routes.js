const express = require('express');
const router = express.Router();

const testing = require('../controllers/testing');

router.get('/testing', testing.getTesting);
router.get('/api/', (req, res) => res.status(200).send('Hello World from Express.js'));

module.exports = router;
