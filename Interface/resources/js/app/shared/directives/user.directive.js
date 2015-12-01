define([

    'angular'

], function(ang) {

    var userDirective = function userDirective() {

        return {

            restrict: 'E',

            scope: {
                username: '='
            },

            templateUrl: 'shared/directives/user.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                console.log('scope', scope);

            }
        }
    };

    return userDirective;

});