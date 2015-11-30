/*globals requirejs:false, window:false */

requirejs([
    
    //'jquery',
    //'modules/module-example'
    'app/demo/demo'

], function (demoApp) {
    
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
