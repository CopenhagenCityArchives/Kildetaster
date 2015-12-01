define([

    'angular',
    'app/shared/templates',
    'app/shared/directives/user.directive'

], function(ang, templates, userDirective) {

    var sharedApp = angular.module('shared', ['templates']);

    sharedApp.directive('user', userDirective);

    return sharedApp;

});