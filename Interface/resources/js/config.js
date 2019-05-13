/*globals requirejs:false */

requirejs.config({

    baseUrl: '/resources/js',

    paths: {

        'almond': '../bower_components/almond/almond',

        'angular': '../bower_components/angular/angular.min',
        'angular-animate': '../bower_components/angular-animate/angular-animate.min',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',
        'ngstorage': '../bower_components/ngstorage/ngStorage.min',

        'angular-google-analytics': '../bower_components/angular-google-analytics/dist/angular-google-analytics.min',

        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        // Polyfill for ui-router events being deprecated @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
        'angular-ui-router/stateEvents': '../bower_components/angular-ui-router/release/stateEvents',

        'angular-ui-select': '../bower_components/angular-ui-select/dist/select',

        //Angular json form
        'tv4': '../bower_components/tv4/tv4',
        'objectpath': '../bower_components/objectpath/lib/ObjectPath',
        'schemaForm': '../bower_components/angular-schema-form/dist/schema-form.min',
        'angular-schema-form-bootstrap': '../bower_components/angular-schema-form/dist/bootstrap-decorator',

        //Copy /paste library
        'clipboard': '../bower_components/clipboard/dist/clipboard.min',

        'angular-flash': '../bower_components/angular-flash-alert/dist/angular-flash',

        'openseadragon': '../bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min',

        //Libs
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery.cookie': 'libs/jquery.cookie',

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
