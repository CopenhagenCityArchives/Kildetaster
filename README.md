Kildetaster
===========

[![Build Status](https://travis-ci.org/CopenhagenCityArchives/Kildetaster.svg?branch=master)](https://travis-ci.org/CopenhagenCityArchives/Kildetaster)

A frontend for indexing, and searching historical records.

Installation
------------

```
npm install
```

Modes and configurations
------------------------

Arguments are passed to the npm scripts after `--`, eg.
`npm run build ---mode=production`.

The project can be built using `--mode=production` or `--mode=development`. The
production mode minifies the build, extracts CSS and uses external source maps.
The development build is unminified, uses inline source maps.

The `--public=<PUBLIC LOCATION>` flag indicates the location of the public
project distribution, and all references to files of the project will be
prefixed with the path (eg. source files referenced in `index.html` file for the
editor application).

Select a set of constants (or configuration) with `--constants=<CONSTANTSET>`. It
defaults to `development`.

The application constants are loaded from the configurations defined in
`constants.json`.

Building
--------

```
npm run build
```

### Building for production

To build for production, run
```
npm run build --mode=production --constants=production --public=<PUBLIC LOCATION>
```

Development
-----------

To run the development server, execute the following:

```
npm start
```

A webserver is then started at `http://localhost:8080`, under which the following 
pages can be visited:

- `http://localhost:8080/sdk/` contains the various SDK plugins.

- `http://localhost:8080/search/` contains the search.

- `http://localhost:8080/editor/task/<TASKID>/page/<PAGEID>/post/<POSTID>`
  contains the editor. Note that you need to fillout `TASKID`, `PAGEID` and `POSTID`.

Remember that arguments can be passed to webpack, like so:

```
npm start -- --mode=production ...
```