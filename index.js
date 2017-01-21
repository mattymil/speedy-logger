"use strict"

let firebase = require('firebase')
let speedTest = require('./lib/speedTest.js')
let config = require('./config/config.json')

// retry interval object
let retryIntervalTimer = undefined
let testInterval = config.testConfig.testInterval
let retryInterval = config.testConfig.retryInterval
const privateConfig = require('./config/privateConfig.json')
const maxInterval = privateConfig.testConfig.maxInterval
const testTime = config.testConfig.testTime

//protect from test interval value being outside of spec
if(testInterval < testTime || testInterval > maxInterval){
  testInterval = privateConfig.testConfig.defaultInterval
}

// protect retryInterval from being out of spec
if( retryInterval < testTime || retryInterval > maxInterval){
  retryInterval = privateConfig.testConfig.defaultRetryInterval
}

// Initialize the DB and get a reference to it
firebase.initializeApp(config.dbConfig)
const database = firebase.database()

//initial run to capture results at t-0
speedTest.go(database, config)

// run speed test on an interval
let testIntervalTimer = setInterval(() => {

  // If retries are under way do not run the standard testInterval
  if(retryIntervalTimer == undefined){
    speedTest.go(database, config, function(success) {

      // If test is not a success and retry interval timer is not already running
      // run a seperate series of tests at retryInterval. Testing for presence
      // of retryIntervalTimer is also necessary because test error
      // may result in more than error event and subsequent callback from
      // speedtest module which will spawn more than one retryIntervalTimer's
      if(!success && retryIntervalTimer == undefined) {
        retryIntervalTimer = setInterval(() => {
          speedTest.go(database, config, function(success){

            // if retry is successful, clear the retryInterval timer and set to
            // undefined
            if(success){
              clearTimeout(retryIntervalTimer)
              retryIntervalTimer = undefined
            }
          })
        }, retryInterval)
      }
    })
  }
}, testInterval)
