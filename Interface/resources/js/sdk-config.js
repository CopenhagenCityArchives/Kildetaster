/*globals requirejs:false */

requirejs.config({

    baseUrl: '/resources/js',

    paths: {

        'almond': '../bower_components/almond/almond',

        'angular': '../bower_components/angular/angular.min',
        'angular-animate': '../bower_components/angular-animate/angular-animate.min',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'ngstorage': '../bower_components/ngstorage/ngStorage.min',
        'angular-google-analytics': '../bower_components/angular-google-analytics/dist/angular-google-analytics.min',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',

        'angularjs-datepicker': '../bower_components/angularjs-datepicker/dist/angular-datepicker',
        'moment': '../bower_components/moment/min/moment-with-locales',

        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-ui-select': '../bower_components/angular-ui-select/dist/select',

        'angular-filter': '../bower_components/angular-filter/dist/angular-filter.min',

        'openseadragon': '../bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min',

        //Libs
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery.cookie': 'libs/jquery.cookie',

        'query-string': '../bower_components/query-string/query-string',

        //Copy /paste library
        'clipboard': '../bower_components/clipboard/dist/clipboard.min',

    },

    shim: {

        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },

        'angular-ui-router': ['angular'],
        'angular-ui-select': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-animate': ['angular'],
        'angular-filter': ['angular'],
        'angular-cookies': ['angular'],
        'ngstorage': ['angular'],
        'angular-google-analytics': ['angular'],
        'angularjs-datepicker': ['angular'],

        'app/shared/constants': ['angular'],

        'libs/openseadragonselection': ['openseadragon'],
        'libs/openseadragon-filtering': ['openseadragon']

    },

    deps: ['sdk-main']

});
