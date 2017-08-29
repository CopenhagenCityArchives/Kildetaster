define([

], function() {

    var textPersonDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-person-name.directive.tpl.html',

            scope: {
                person: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textPersonDirective;

});