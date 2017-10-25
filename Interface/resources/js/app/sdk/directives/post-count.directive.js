define([

], function() {

    var postClountDirective =  /*@ngInject*/ function() {

        return {

            restrict: 'E',

            templateUrl: 'sdk/directives/post-count.directive.tpl.html',

            scope: {
                page: '=',
                total: '=',
                postsPrPage: '='
            },

            link: function(scope, element, attr) {

                function updateValues(newval) {
                    //currentIndex is zerobased
                    scope.from = (newval * scope.postsPrPage) + 1;

                    //If we are showing the last page, and it does not contain a full set of total pages
                    if ((newval + 1) * scope.postsPrPage > scope.total) {
                        //Just show the total as the to
                        scope.to = scope.total;
                    }
                    //Otherwise build the number
                    else {
                        scope.to = (newval + 1) * scope.postsPrPage;
                    }
                }

                /**
                * Watch for changes to currently selected page, and build a string to show the user exactly what postsPrPage
                * they are being presented
                */
                scope.$watch('page', function(newval, oldval) {
                    updateValues(newval);
                });

                /**
                * Watch for changes to the total amount, and update if its new
                */
                scope.$watch('total', function(newval, oldval) {
                    updateValues(scope.page);
                });

            }
        };

    };

    return postClountDirective;

});
