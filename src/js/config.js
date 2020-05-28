/*globals requirejs:false */

requirejs.config({

    baseUrl: '/resources/js',

    shim: {

        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },

        'angular-bootstrap': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-ui-select': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-animate': ['angular'],
        'angular-flash': ['angular'],
        'angular-cookies': ['angular'],
        'ngstorage': ['angular'],
        'angular-google-analytics': ['angular'],

        'app/shared/constants': ['angular'],

        'libs/openseadragonselection': ['openseadragon'],
        'libs/openseadragon-filtering': ['openseadragon'],
        'libs/openseadragon-imaginghelper': ['openseadragon'],
        'libs/openseadragon-viewerinputhook': ['openseadragon']

    },

    deps: ['main']

});
