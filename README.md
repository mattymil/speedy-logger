## Description
Speedy-logger is an internet speed test application that will run on a preconfigured timing interval. If the test fails, retries will be made on a more frequent configurable interval until connectivity is restored. Upon test completion the results are logged in firebase.

## Configuration

All configuration options can be found in ```config.json```.

- ```dbConfig``` object contains usual settings for database and auth only.
- ```testConfig``` object contains
  - ```testTime``` property which sets the maximum amount of time the test will run. Recommended time is 20000ms as this provides most stable results.
  - ```testsLocation``` property defines where test data will be stored relative to your firebase root. Default is ``` your_firebase_root/tests```
  - ```errorsLocation``` property defines where test data will be stored relative to your firebase root. Default is ``` your_firebase_root/errors```
  - ```testInterval``` how often should the test be run, cannot be smaller than testTime or larger than 2147483647ms. Default is 3600000 ms.
  - ```retryInterval``` in the event of a test failure i.e. no connectivity how often should retries be made. Default is 60000 ms.

## Data Structure
- Test data and error data will be stored at your_firebase_root/tests and your_firebase_root/errors respectively.
- Each test object is stored in firebase with the test timestamp as its key. For graphing or any other purposes this can be used as the test date and time as the test data object does not include a test time
- The test data object is as follows (taken from speedtest-net library readme)
  - ```speeds```:
    - ```download```: download bandwidth in megabits per second
    - ```upload```: upload bandwidth in megabits per second
    - ```originalDownload```: unadjusted download bandwidth in bytes per second
    - ```originalUpload```: unadjusted upload bandwidth in bytes per second

  - ```client```:
    - ```ip```: ip of client
    - ```lat```: latitude of client
    - ```lon```: longitude of client
    - ```isp```: client's isp
    - ```isprating```: some kind of rating
    - ```rating```: another rating, which is always 0 it seems
    - ```ispdlavg```: avg download speed by all users of this isp in Mbps
    - ```ispulavg```: same for upload
  - ```server```:
    - ```host```: test server url
    - ```lat```: latitude of server
    - ```lon```: longitude of something
    - ```location```: name of a location, usually a city, but can be anything
    - ```country```: name of the country
    - ```cc```: country code
    - ```sponsor```: who pays for the test server
    - ```distance```: distance from client to server (SI)
    - ```distanceMi```: distance from client to server (Imperial)
    - ```ping```: how long it took to download a small file from the server, in ms
    - ```id```: the id of the server

## Versions
- 1.0.4 Added Readme
- 1.0.5 Updated Readme (Fixed Typo)
- 1.0.6 Fixed error in test error handler
- 1.0.7 Added interval functionality
- 1.0.8 Added description to readme
- 1.0.9 Added strict mode
- 1.1.0 Added initial test run to gather results at t-0
- 1.1.1 Updated repo URL
- 1.1.2 Bump
- 1.1.3 Fixed error in default testInterval
- 1.1.4 Changed repo to github from bitbucket
- 1.2.0 Added reference to speedy-web
- 1.3.0 Added test failure retry functionality
- 1.3.1 Fixed error in readme.
- 1.3.2 Minor fix
- 1.3.3 Readme fix
