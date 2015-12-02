define([

    'angular',
    'app/shared/templates',
    'app/shared/directives/user.directive',
    'app/shared/directives/imageViewer.directive',
    'app/shared/directives/stepOf.directive',
    'app/shared/directives/stepIndicator.directive',

    'app/shared/services/step.service'

], function(

    ang,
    templates,
    userDirective,
    imageViewerDirective,
    stepOfDirective,
    stepIndicatorDirective,

    stepService

    ) {

    var sharedApp = angular.module('shared', ['templates']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);

    sharedApp.factory('step', stepService);

    return sharedApp;

});