/**
*
* This file contains the RequireJS setup for require when running karma 
*
**/

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
        //Overall path to make paths from the application work in the test invironment
        'app'                   : 'js/app',
        'libs'                   : 'js/libs',
    
        'jquery'                : 'bower_components/jquery/dist/jquery.min',
        'angular'               : 'bower_components/angular/angular.min',
        'angular-mocks'         : 'bower_components/angular-mocks/angular-mocks',       
        'angular-animate'       : 'bower_components/angular-animate/angular-animate.min',
        'angular-bootstrap'     : 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-sanitize'      : 'bower_components/angular-sanitize/angular-sanitize.min',
        'angular-flash'         : 'bower_components/angular-flash-alert/dist/angular-flash',

        'angular-ui-router'     : 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-ui-select'     : 'bower_components/ui-select/dist/select.min',

        //Angular json form
        'tv4'                          : 'bower_components/tv4/tv4',
        'objectpath'                   : 'bower_components/objectpath/lib/ObjectPath',
        'schemaForm'                   : 'bower_components/angular-schema-form/dist/schema-form.min',
        'angular-schema-form-bootstrap': 'bower_components/angular-schema-form/dist/bootstrap-decorator',

        'openseadragon'         : 'bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min',
        
    },

    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-mocks': ['angular'],

        'angular-ui-router': ['angular'],
        'angular-ui-select': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-animate': ['angular'],
        'angular-flash': ['angular'],
        
        'app/shared/constants': ['angular'],

        'bootstrap': ['jquery'],
        'angular-bootstrap': ['angular'],

        'libs/openseadragonselection': ['openseadragon'],
        'libs/openseadragon-filtering': ['openseadragon']

    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});