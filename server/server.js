const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const db = require('./database');
const MongoStore = require('connect-mongo')(session);
const User = require('./database/models/user');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 5000;
const secretToken = process.env.SECRET || 'please-end-my-life';
const authentication = require('./authentication');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use(session({
  // secret is used to sign the session
  secret: secretToken,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db})
}));

// use authentication as a middleware for all requests
app.use(authentication.initialize());
app.use(authentication.session());

// API calls
app.use('/api',router);
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
