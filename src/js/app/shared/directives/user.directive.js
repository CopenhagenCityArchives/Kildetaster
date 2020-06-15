define([

    'angular'

], function(ang) {

    var userDirective = [function userDirective() {

        return {

            restrict: 'E',

            scope: {
                data: '='
            },

            template: require('./user.directive.tpl.html'),

            link: function(scope, element, attrs) {

                scope.username = scope.data.username;
                scope.page_number = scope.data.page_number;
                scope.link = "someurl/" + scope.data.id;

            }
        };
    }];

    return userDirective;

});
