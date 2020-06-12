// Karma configuration
// Generated on Tue Dec 01 2015 10:09:38 GMT+0100 (CET)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'src/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [

            'bower_components/jquery/dist/jquery.min.js',
            {
                pattern: 'bower_components/**/*.js',
                included: false
            }, 
            //Include map files
            {
                pattern: 'bower_components/**/*.map',
                included: false
            }, {
                pattern: 'js/libs/**/*.js',
                included: false
            }, {
                pattern: 'js/app/**/*.js',
                included: false
            }, {
                pattern: 'js/test/**/*.js',
                included: false
            },
            '../../test-main.js',
        ],


        // list of files to exclude
        exclude: [
            //'libs/angular.1.5.0.b2.min.js'
            'bower_components/**/test/*.*'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'PhantomJS'],
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
