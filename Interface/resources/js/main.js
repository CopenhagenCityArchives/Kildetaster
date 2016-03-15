/*globals requirejs:false, window:false */

requirejs([
    
    'jquery',

    'app/editor/editor'

], function ($, editorApp) {
    
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


//http://stackoverflow.com/questions/34545875/how-to-store-authentication-bearer-token-in-browser-cookie-using-angularjs
//http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication

    /* Attach events
    ----------------------------*/
    $(onReady); //Document ready
    $(window).resize(function () {
        onResize();
        clearTimeout(timer);
        timer = setTimeout(afterResize, 50);
    });

});