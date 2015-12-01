var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        'jquery'        : 'bower_components/jquery/dist/jquery.min',
        'angular'       : 'bower_components/angular/angular.min',
        'angular-mocks' : 'bower_components/angular-mocks/angular-mocks'
    },

    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-mocks': ['angular']
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});