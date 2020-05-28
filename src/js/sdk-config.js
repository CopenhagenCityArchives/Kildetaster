/*globals requirejs:false */

requirejs.config({

    baseUrl: '/resources/js',

    shim: {

        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },

        'bootstrap': ['jquery'],
        'angular-bootstrap': ['angular'],
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
