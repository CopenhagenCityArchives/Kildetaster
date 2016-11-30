define([

], function() {

    var paginationDirective =  /*@ngInject*/ function($timeout) {

        return {

            restrict: 'E',

            templateUrl: 'sdk/directives/pagination.directive.tpl.html',

            scope: {
                goToPage: '&',
                currentIndex: '=',
                pagination: '='

            },

            link: function(scope, element, attr) {

                /**
                * Call goToPage function passed from parent scope
                */
                scope.callGoToPage = function(index) {
                    scope.goToPage()(index)
                }

                /**
                * Go back in pages, by the specified amount
                * If no amount given, default to 1 page
                */
                scope.prev = function prev(amount) {
                    amount = amount || 1;
                    if (scope.currentIndex > amount - 1)  {
                        scope.callGoToPage(scope.currentIndex - amount);
                    }

                }

                /**
                * Go forward in pages, by the specified amount
                * If no amount given, default to 1 page
                */
                scope.next = function next(amount) {
                    amount = amount || 1;
                    if (scope.currentIndex < scope.pagination.total - amount) {
                        scope.callGoToPage(scope.currentIndex + amount);
                    }
                }

                scope.canGoBack10 = function canGoBack10() {
                    return scope.currentIndex - 10 >= 0;
                }

                scope.canGoForward10 = function canGoBack10() {
                    return scope.currentIndex + 10 < scope.pagination.total;
                }

            }
        };

    };

    return paginationDirective;

});
