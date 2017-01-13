
let speedTest = require('speedtest-net')

// dummy object to log errors to test data
let downTestObj = {
  server: {
    ping: 0
  },
  speeds: {
    download: 0
}}

module.exports = {
  go: function(database, config) {

    // initialize the speedtest with the appropriate test time and pingCount
    const test = speedTest({maxTime: config.testConfig.testTime})

    // log results to the database
    test.on('data', data => {
      //log to firebase
      database.ref(config.testConfig.testsLocation + Date.now()).set(data)
    });

    // on error log it to the database
    test.on('error', err => {
      database.ref(config.testConfig.errorsLocation + Date.now()).set(err)

      // log O's to test results to reflect errors
      database.ref(config.testConfig.testsLocation + Date.now()).set(downTestObj)
    });
  }
}