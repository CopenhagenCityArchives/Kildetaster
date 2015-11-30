/*globals requirejs:false */

requirejs.config({
    baseUrl: '/resources/js/modules',
    paths: {
        'main'              : '../main',
        'almond'            : '../libs/almond.0.2.5',
        //Libs
        'jquery'            : '../libs/jquery-1.11.3.min',
        'selectivizr'       : '../libs/selectivizr-min',
        'jquery.cookie'            : '../libs/jquery.cookie',

        //Plugins
        'mouse-detect'            : '../plugins/mouse-detect',

    },
    shim: {
        
    },
    deps: ['main', 'selectivizr', 'mouse-detect']
});
