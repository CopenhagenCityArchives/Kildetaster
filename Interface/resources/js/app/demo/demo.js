define([

    'angular'

], function() {

    var demoApp = angular.module('demoApp', []);

    demoApp.controller('demoController', function($scope) {
        $scope.hello = "world";
    });

    angular.element(document).ready(function () {
        angular.bootstrap(angular.element('[data-demo-app]'), ['demoApp']);
    });
    
    return demoApp;

});