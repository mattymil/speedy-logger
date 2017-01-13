let firebase = require('firebase')
let speedTest = require('speedtest-net')
let config = require('./config.json')
let dbConfig = config.dbConfig

firebase.initializeApp(dbConfig)

// Get a reference to the database service
const database = firebase.database()

// initialize the speedtest with the appropriate test time and pingCount
const test = speedTest({maxTime: config.testConfig.testTime})

// log results to the database
test.on('data', data => {
  //add a time tested property to the object
  database.ref('tests/' + Date.now()).set(data)
  process.exit()
});

// on error log it to the database
test.on('error', err => {
  database.ref('errors/' + Date.now()).set(error)
  process.exit()
});
