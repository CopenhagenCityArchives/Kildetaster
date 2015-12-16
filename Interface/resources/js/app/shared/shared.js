define([

    'angular',
    'app/shared/templates',
    'app/shared/constants',

    'app/shared/directives/user.directive',
    'app/shared/directives/imageViewer.directive',
    'app/shared/directives/stepOf.directive',
    'app/shared/directives/stepIndicator.directive',
    
    'app/shared/directives/dynamicInput.directive',
    'app/shared/directives/dynamicSelect.directive',
    'app/shared/directives/dynamicTypeahead.directive',

    'app/shared/services/step.service',
    'app/shared/services/task.service',
    'app/shared/services/page.service',
    'app/shared/services/user.service',
    'app/shared/services/update.service',
    'app/shared/services/error.service',

    'app/shared/filters/nameFromObject.filter',

    'app/shared/constants/text.constant'

], function(

    ang,
    templates,
    constants,

    userDirective,
    imageViewerDirective,
    stepOfDirective,
    stepIndicatorDirective,

    dynamicInputDirective,
    dynamicSelectDirective,
    dynamicTypeaheadDirective,

    stepService,
    taskService,
    pageService,
    userService,
    updateService,
    errorService,

    nameFromObjectFilter,

    textConstant

    ) {

    var sharedApp = angular.module('shared', ['templates', 'constants']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);
    
    sharedApp.directive('dynamicInput', dynamicInputDirective);
    sharedApp.directive('dynamicSelect', dynamicSelectDirective);
    sharedApp.directive('dynamicTypeahead', dynamicTypeaheadDirective);

    sharedApp.factory('stepService', stepService);
    sharedApp.factory('taskService', taskService);
    sharedApp.factory('pageService', pageService);
    sharedApp.factory('userService', userService);
    sharedApp.factory('updateService', updateService);
    sharedApp.factory('errorService', errorService);

    sharedApp.filter('nameFromObject', nameFromObjectFilter);

    sharedApp.constant('TEXT', textConstant);

    sharedApp.run(function ($rootScope, TEXT) {
        $rootScope.TEXT = TEXT;
    });

    return sharedApp;

});