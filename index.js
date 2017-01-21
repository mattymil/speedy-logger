"use strict"

let firebase = require('firebase')
let speedTest = require('./lib/speedTest.js')
let config = require('./config/config.json')
const privateConfig = require('./config/privateConfig.json')
const maxInterval = privateConfig.testConfig.maxInterval


//protect from test interval value being outside of spec
if(config.testConfig.testInterval < config.testConfig.testTime || config.testConfig.testInterval > maxInterval){
  config.testConfig.testInterval = privateConfig.testConfig.defaultInterval
}

// Initialize the DB and get a reference to it
firebase.initializeApp(config.dbConfig)
const database = firebase.database()

//initial run to capture results at t-0
speedTest.go(database, config)

// run speed test on an interval
let t = setInterval(() => {
  speedTest.go(database, config, function(success) {

    // retry interval object
    let r = undefined

    // If test is not a success run it at retryInterval. If test is successful
    // and retry interval object is defined clear the interval
    if(!success) {

      r = setInterval(() => {
        
      })

    } else if(success && r != undefined)
  })
}, config.testConfig.testInterval)
