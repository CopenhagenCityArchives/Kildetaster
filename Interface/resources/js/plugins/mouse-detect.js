/*global define:false, Modernizr:false */
define([], function () {
    'use strict';

    var addEvent,
        removeEvent,
        onMouseDown,
        onMouseMove,
        mightBeMouse = false;


    addEvent = function (el, event, listener) {
        if (el.addEventListener) {
            el.addEventListener(event, listener, false);
        } else {
            el.attachEvent('on' + event, listener);
        }
    };

    removeEvent = function (el, event, listener) {
        if (el.addEventListener) {
            el.removeEventListener(event, listener, false);
        } else {
            el.detachEvent('on' + event, listener);
        }
    };

    onMouseDown = function () {
        mightBeMouse = false;
    };

    onMouseMove = function () {
        if (mightBeMouse) {
            Modernizr.addTest('mouse', true);
            removeEvent(document.documentElement, 'mousedown', onMouseDown);
            removeEvent(document.documentElement, 'mousemove', onMouseMove);
        }
        mightBeMouse = true;
    };
    mightBeMouse = false;
    addEvent(document.documentElement, 'mousedown', onMouseDown);
    addEvent(document.documentElement, 'mousemove', onMouseMove);
});