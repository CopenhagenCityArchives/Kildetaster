define([

    'angular',
    'app/shared/templates',
    'app/shared/directives/user.directive',
    'app/shared/directives/imageViewer.directive',
    'app/shared/directives/stepOf.directive',
    'app/shared/directives/stepIndicator.directive',
    
    'app/shared/directives/dynamicInput.directive',
    'app/shared/directives/dynamicSelect.directive',

    'app/shared/services/step.service',
    'app/shared/services/project.service'

], function(

    ang,
    templates,
    userDirective,
    imageViewerDirective,
    stepOfDirective,
    stepIndicatorDirective,

    dynamicInputDirective,
    dynamicSelectDirective,

    stepService,
    projectService

    ) {

    var sharedApp = angular.module('shared', ['templates']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);
    
    sharedApp.directive('dynamicInput', dynamicInputDirective);
    sharedApp.directive('dynamicSelect', dynamicSelectDirective);

    sharedApp.factory('stepService', stepService);
    sharedApp.factory('projectService', projectService);

    return sharedApp;

});