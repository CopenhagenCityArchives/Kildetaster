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

        // Foundation
        'foundation': '../libs/foundation/foundation',
        'foundation.abide': '../libs/foundation/foundation.abide',
        'foundation.accordion': '../libs/foundation/foundation.accordion',
        'foundation.alert': '../libs/foundation/foundation.alert',
        'foundation.clearing': '../libs/foundation/foundation.clearing',
        'foundation.dropdown': '../libs/foundation/foundation.dropdown',
        'foundation.equalizer': '../libs/foundation/foundation.equalizer',
        'foundation.interchange': '../libs/foundation/foundation.interchange',
        'foundation.joyride': '../libs/foundation/foundation.joyride',
        'foundation.magellan': '../libs/foundation/foundation.magellan',
        'foundation.offcanvas': '../libs/foundation/foundation.offcanvas',
        'foundation.orbit': '../libs/foundation/foundation.orbit',
        'foundation.reveal': '../libs/foundation/foundation.reveal',
        'foundation.slider': '../libs/foundation/foundation.slider',
        'foundation.tab': '../libs/foundation/foundation.tab',
        'foundation.tooltip': '../libs/foundation/foundation.tooltip',
        'foundation.topbar': '../libs/foundation/foundation.topbar'
    },
    shim: {
        'foundation': ['jquery'],
        'foundation.abide': ['foundation'],
        'foundation.accordion': ['foundation'],
        'foundation.alert': ['foundation'],
        'foundation.clearing': ['foundation'],
        'foundation.dropdown': ['foundation'],
        'foundation.equalizer': ['foundation'],
        'foundation.interchange': ['foundation'],
        'foundation.joyride': ['foundation', 'jquery.cookie'],
        'foundation.magellan': ['foundation'],
        'foundation.offcanvas': ['foundation'],
        'foundation.orbit': ['foundation'],
        'foundation.reveal': ['foundation'],
        'foundation.slider': ['foundation'],
        'foundation.tab': ['foundation'],
        'foundation.tooltip': ['foundation'],
        'foundation.topbar': ['foundation']
    },
    deps: ['main', 'selectivizr', 'mouse-detect']
});
