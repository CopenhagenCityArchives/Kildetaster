# Kildetaster

[![Build Status](https://travis-ci.org/CopenhagenCityArchives/Kildetaster.svg?branch=master)](https://travis-ci.org/CopenhagenCityArchives/Kildetaster)

Frontend for indexing archival material

Remember to run `npm install` and `bower install` to get all dependencies

Dependencies: node.js, npm and Grunt (`npm install -g grunt-cli`)

## How to start local prototype

Start with running `npm install`and `bower install` to get all dependencies from the main folder

### Start prototype with Authorization

Then run `grunt prototype` to start the prototype. This will build all frontend files, and start a local webserver to host the solution

### Start prototype with NoAuth

Then run `grunt prototypeNoAuth` to start the prototype. This will build all frontend files, and start a local webserver to host the solution

The editor can be hit at http://localhost:1508/#/task/1/page/1/?stepId=1


## API endpoint
The api endpoint can be changed by editing the constant in Interface/grunttasks/ngconstant.js

Look for the property 'API'
