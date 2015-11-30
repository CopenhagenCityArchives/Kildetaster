/*globals requirejs:false */

requirejs.config({
    baseUrl: '/resources/js',
    paths: {
        
        'almond'                : 'libs/almond.0.3.1',

        'bootstrap'              : 'libs/bootstrap.min',
        
        //Libs
        'jquery'                : 'libs/jquery-1.11.3.min',
        'jquery.cookie'         : 'libs/jquery.cookie',

        //Plugins
        'mouse-detect'          : 'plugins/mouse-detect',


    },
    shim: {
        'bootstrap' : { 
            'deps' :['jquery']
        }
    },
    deps: ['main', 'bootstrap', 'mouse-detect']
});
