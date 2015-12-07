module.exports = function(grunt) {
    var path = require('path');

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt, {
    	jitGrunt: {
             staticMappings: {
                ngconstant: 'grunt-ng-constant'
            }
        },
        configPath: path.join(process.cwd(), 'Interface/grunttasks')
    });
};