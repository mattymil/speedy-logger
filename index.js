var firebase = require('firebase');
var speedTest = require('speedtest-net')
var config = require('./config.json');
var dbConfig = config.dbConfig;

firebase.initializeApp(dbConfig);

// Get a reference to the database service
var database = firebase.database();

// initialize the speedtest
const test = speedTest({maxTime: 20000});

// on data log it to the database
test.on('data', data => {
  database.ref('tests/' + Date.now()).set(data);
  console.log(data);
  process.exit();
});

// on error log it to the database
test.on('error', err => {
  database.ref('errors/' + Date.now()).set(error);
  process.exit();
});
