module.exports = function(grunt) {
    var path = require('path');

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt, {
    	jitGrunt: true,
        configPath: path.join(process.cwd(), 'Interface/grunttasks')
    });
};