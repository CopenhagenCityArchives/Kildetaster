define([

], function() {

    var textGenderDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-gender.directive.tpl.html',

            scope: {
                type: '='
            },

            link: function(scope, element, attr) {
                switch (scope.type) {
                    case 1: 
                        scope.gender = 'Mand';
                        break;
                    case 2:
                        scope.gender = 'Kvinde';
                        break;
                    default:
                        scope.gender = 'Ukendt';
                }
            }
        };

    };

    return textGenderDirective;

});