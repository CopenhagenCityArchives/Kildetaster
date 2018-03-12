# Kildetaster

[![Build Status](https://travis-ci.org/CopenhagenCityArchives/Kildetaster.svg?branch=master)](https://travis-ci.org/CopenhagenCityArchives/Kildetaster)

Frontend for indexing archival material

Remember to run `npm install` and `bower install` to get all dependencies

Dependencies: node.js, npm and Grunt (`npm install -g grunt-cli`)

## How to start local prototype

Start with running `npm install`and `bower install` to get all dependencies from the main folder

### Start prototype of the editor with Authorization

Then run `grunt prototype` to start the prototype. This will build all frontend files, and start a local webserver to host the solution

### Start prototype of the editor with NoAuth

Then run `grunt prototypeNoAuth` to start the prototype. This will build all frontend files, and start a local webserver to host the solution

The editor can be hit at http://localhost:1508/#/task/1/page/1/?stepId=1

### Development of prototype of the Joomla SDK

In order to start the prototype for sdk parts, you need to run `grunt sdk`. That will start a local webserver on port 1510. Joomla parts will be visible on the page that is automatically opened in the browser.

#### Local version of the search

After starting the SDK prototype, go to the url http://localhost:1510/search.html

## API endpoint
The api endpoints can be changed by editing the constant in Interface/grunttasks/ngconstant.js

Look for the property 'API' and 'SOLRAPI'

## Deployment using grunt

Add a .ftppass file with FTP credentials for the server(s).

Run `grunt deploy_dev` or `grunt deploy_prod`

## How to deploy to test environment
Run `grunt dev` and `grunt deploy_dev`

This will build a development package and deploy it to the two deployment sites (kbhkilder.dk/software/kildetaster-development and kbharkiv.dk/kildetaster-development)

## How to deploy to production
Run `grunt` and `grunt deploy_prod`

This will build a development package and deploy it to the two deployment sites (kbhkilder.dk/software/kildetaster and kbharkiv.dk/kildetaster)

## How to build for production
In order to build the frontend to be released to production, you need to run `grunt`with no arguments. That will build and bundle frontend for both the editor and the Joomla SDK.

The output of this operation can be found in the filestructure in a folder called `kbh`

This folder will contain an `index.html` file, and a folder called `resources`.

The `index.html` should be uploaded to where the editor needs to be found on kbharkiv.dk, and and the resources folder should be uploaded to kbhkilder.dk in the folder `public_html/software/kildetaster`.

The reason we need to upload a new `index.html` file, is because of cachebust url-parameters on all style and javascript includes. With updated urls for those, all browsers will force a new download, regardless of what they might have cached from previous visits to the editor.
