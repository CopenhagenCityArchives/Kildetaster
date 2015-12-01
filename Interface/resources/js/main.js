/*globals requirejs:false, window:false */

requirejs([
    
    'jquery',

    'app/editor/editor',
    'app/demo/demo'

], function ($, editorApp, demoApp) {
    
    'use strict';

    var onReady, onResize, afterResize, timer;

    /* Hookups
    ----------------------------*/
    onReady = function () {
        //
    };

    onResize = function () {
        //
    };

    afterResize = function () {
        //
    };


    /* Attach events
    ----------------------------*/
    $(onReady); //Document ready
    $(window).resize(function () {
        onResize();
        clearTimeout(timer);
        timer = setTimeout(afterResize, 50);
    });

});