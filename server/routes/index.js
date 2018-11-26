const express = require('express');
const router = express.Router();
const account = require('./account');
const docs = require('./docs');
const complaints = require('./complaints');

const testing = require('../controllers/testing');

router.use('/account', account);
router.use('/docs', docs);
router.use('/complaints', complaints);
router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
router.post('/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
router.get('/testing', testing.getTesting);

module.exports = router;
