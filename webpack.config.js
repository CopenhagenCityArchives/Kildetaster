const path = require('path');

module.exports = {
    entry: './Interface/resources/js/main.js',
    resolve: {
        alias: {
            'almond': path.resolve(__dirname, 'Interface/resources/bower_components/almond/almond'),
            
            'angular': path.resolve(__dirname, 'Interface/resources/bower_components/angular/angular.min'),
            'angular-bootstrap': path.resolve(__dirname, 'Interface/resources/bower_components/angular-bootstrap/ui-bootstrap-tpls.min'),
            'angular-animate': path.resolve(__dirname, 'Interface/resources/bower_components/angular-animate/angular-animate.min'),
            'angular-sanitize': path.resolve(__dirname, 'Interface/resources/bower_components/angular-sanitize/angular-sanitize.min'),
            'angular-cookies': path.resolve(__dirname, 'Interface/resources/bower_components/angular-cookies/angular-cookies.min'),
            'ngstorage': path.resolve(__dirname, 'Interface/resources/bower_components/ngstorage/ngStorage.min'),

            'angular-google-analytics': path.resolve(__dirname, 'Interface/resources/bower_components/angular-google-analytics/dist/angular-google-analytics.min'),

            'angular-ui-router': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-router/release/angular-ui-router.min'),
            // Polyfill for ui-router events being deprecated @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
            'angular-ui-router/stateEvents': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-router/release/stateEvents'),

            'angular-ui-select': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-select/dist/select'),

            //Angular json form
            'tv4': path.resolve(__dirname, 'Interface/resources/bower_components/tv4/tv4'),
            'objectpath': path.resolve(__dirname, 'Interface/resources/bower_components/objectpath/lib/ObjectPath'),
            'schemaForm': path.resolve(__dirname, 'Interface/resources/bower_components/angular-schema-form/dist/schema-form.min'),
            'angular-schema-form-bootstrap': path.resolve(__dirname, 'Interface/resources/bower_components/angular-schema-form/dist/bootstrap-decorator'),

            //Copy /paste library
            'clipboard': path.resolve(__dirname, 'Interface/resources/bower_components/clipboard/dist/clipboard.min'),

            'angular-flash': path.resolve(__dirname, 'Interface/resources/bower_components/angular-flash-alert/dist/angular-flash'),

            'openseadragon': path.resolve(__dirname, 'Interface/resources/bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min'),

            //Libs
            'jquery': path.resolve(__dirname, 'Interface/resources/bower_components/jquery/dist/jquery.min'),
            'jquery.cookie': path.resolve(__dirname, 'Interface/resources/js/libs/jquery.cookie'),
        }
    },
    output: {
        filename: 'editor.js',
        path: path.resolve(__dirname, 'dist'),
    },
};