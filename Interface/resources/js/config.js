/*globals requirejs:false */

requirejs.config({
    baseUrl: '/resources/js',
    paths: {
        
        'almond'                : 'libs/almond.0.3.1',

        'bootstrap'             : 'libs/bootstrap.min',

        'angular'               : 'libs/angular.1.5.0.b2.min',
        
        //Libs
        'jquery'                : 'libs/jquery-1.11.3.min',
        'jquery.cookie'         : 'libs/jquery.cookie',

        //Plugins
        'mouse-detect'          : 'plugins/mouse-detect',


    },
    shim: {
        'angular': ['jquery'],
        'bootstrap': ['jquery']
    },
    deps: ['main', 'bootstrap', 'mouse-detect']
});
