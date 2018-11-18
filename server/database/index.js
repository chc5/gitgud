const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGO_LOCAL_URL = 'mongodb://localhost/gitgud';
const MONGO_URL = process.env.MONGODB_URI || MONGO_LOCAL_URL;


let database;
// Connect to mongodb
mongoose.connect(MONGO_URL, { useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('Database Error---------------------------', err);
  } else {
    console.log('Connected to db');
  }
});

// Retrieve db connection
database = mongoose.connection;
database.on('error', err => {
  console.log('Error getting db connection', err);    
});
database.once('open', () => {
  console.log('Successfully retrieved db connection');
});

module.exports = database;
