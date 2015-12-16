define([

    'angular'

], function(ang) {

    var userDirective = /*@ngInject*/ function userDirective() {

        return {

            restrict: 'E',

            scope: {
                data: '='
            },

            templateUrl: 'shared/directives/user.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                scope.username = scope.data.username;
                scope.link = "someurl/" + scope.data.id;

            }
        };
    };

    return userDirective;

});