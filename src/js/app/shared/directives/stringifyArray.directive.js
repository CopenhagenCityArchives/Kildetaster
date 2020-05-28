/**
* Take an array, and build a string with values from prop
* and make sure the string is of a specific length
*/
define([

], function() {

    var stringifyArrayDirective = /*@ngInject*/ function() {

        return {

            scope: {
                array: '=',
                prop: '=',
                length: '='
            },

            replace: true,

            template: '<span>{{joined}}</span>',

            link: function(scope, element, attrs) {

                //Length of the final string, if we have a value, use that, otherwise default to 20
                scope.length = scope.length || 20;

                scope.joined = '';

                scope.$watchCollection('array', function(newArr) {

                    if (angular.isArray(scope.array)) {

                        var all = newArr.map(function(item) {
                            return item[scope.prop];
                        }).join(', ');

                        scope.joined = all.slice(0, scope.length) + ' ...';

                    }
                    
                });
            }
        };
    };

    stringifyArrayDirective.$injet = ['$parse'];

    return stringifyArrayDirective;

});
