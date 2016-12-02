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

## How to build for production
In order to build the frontend to be released to production, you need to run `grunt`with no arguments. That will build and bundle frontend for both the editor and the Joomla SDK.

The output of this operation can be found in the filestructure in a folder called `kbh`

This folder will contain an `index.html` and a `search.html` file, and a folder called `resources`. For now, the search.html file is not used anywhere and can be ignored.

The index.html should be uploaded to where the editor needs to be found on kbharkiv.dk, and and the resources folder should be uploaded to kbhkilder in the folder `public_html/software/kildetaster`.

The reason we need to upload a new index.html file, is because of cachebust url-parameters on all style and javascript includes. With updated urls for those, all browsers will forace a new download, regardless of what they might have cached from previous visits to the editor.
