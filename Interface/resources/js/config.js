/*globals requirejs:false */

requirejs.config({
    
    baseUrl: '/resources/js',

    paths: {
        
        'almond'                : 'libs/almond.0.3.1',

        'bootstrap'             : '../bower_components/bootstrap-sass/assets/javascripts/bootstrap.min',

        'angular'               : '../bower_components/angular/angular.min',
        'angular-animate'       : '../bower_components/angular-animate/angular-animate.min',

        'openseadragon'         : '../bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min',

        //Libs
        'jquery'                : '../bower_components/jquery/dist/jquery.min',
        'jquery.cookie'         : 'libs/jquery.cookie',

        //Plugins
        'mouse-detect'          : 'plugins/mouse-detect',

    },

    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'bootstrap': ['jquery']
    },
    
    deps: ['main', 'bootstrap', 'mouse-detect']

});
