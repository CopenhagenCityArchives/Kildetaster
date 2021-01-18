define([

], function() {

    var textPersonDirective =  function() {

        return {
            restrict: 'E',

            template: require('./text-person-name.directive.tpl.html'),

            scope: {
                person: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textPersonDirective;

});