#APACS datasource editor

Small service for super users. Used to create and update values in APACS datasources.

###Initialization
``npm install``

``bower install``

###Grunt commands

``grunt``

This will watch and concat all js and add all bower dependencies. Great for development.

``grunt build-dev``

The same, but without watching

``grunt build``

This will concat all js and css files and place them in /build.

``grunt deploy``

This will deploy all files in /build to kbhkilder.dk/software/apacs_datasource_editor

Remember to run ´´grunt build´´ first!

###Docker
Start server:

``docker-compose up``

Server is now accessible at http://localhost:9000/index.html
