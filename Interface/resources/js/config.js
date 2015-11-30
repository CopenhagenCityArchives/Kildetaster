/*globals requirejs:false */

requirejs.config({
    baseUrl: '/resources/js',
    paths: {
        
        'almond'                : 'libs/almond.0.2.5',
        
        //Libs
        'jquery'                : 'libs/jquery-1.11.3.min',
        'jquery.cookie'         : 'libs/jquery.cookie',

        //Plugins
        'mouse-detect'          : 'plugins/mouse-detect',

    },
    shim: {
        
    },
    deps: ['main', 'mouse-detect']
});
