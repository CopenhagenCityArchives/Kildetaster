/*globals requirejs:false */

requirejs.config({
    
    baseUrl: '/resources/js',

    paths: {
        
        'almond'                : '../bower_components/almond/almond',

        'angular'               : '../bower_components/angular/angular.min',
        'angular-animate'       : '../bower_components/angular-animate/angular-animate.min',
        'angular-bootstrap'     : '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-sanitize'      : '../bower_components/angular-sanitize/angular-sanitize.min',
        
        'angular-ui-router'     : '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-ui-select'     : '../bower_components/ui-select/dist/select.min',
                
        'openseadragon'         : '../bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min',

        //Libs
        'jquery'                : '../bower_components/jquery/dist/jquery.min',
        'jquery.cookie'         : 'libs/jquery.cookie',

    },

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

        'app/shared/constants': ['angular'],

        'libs/openseadragonselection': ['openseadragon'],
        'libs/openseadragon-filtering': ['openseadragon']

    },
    
    deps: ['sdk-main']

});
