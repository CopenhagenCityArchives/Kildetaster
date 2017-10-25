define([

], function() {

    var paginationDirective =  /*@ngInject*/ function($timeout) {

        return {

            restrict: 'E',

            templateUrl: 'sdk/directives/pagination.directive.tpl.html',

            scope: {
                goToPage: '&',
                currentPage: '=',
                results: '='
            },

            link: function(scope, element, attr) {

                scope.buildPaginationItem = function (page) {
                    return  {
                        label: page + 1,
                        number: page
                    }
                }

                scope.buildPagination = function (results, page) {
                    var arr = [],
                        lastPage = Math.ceil(results.numFound / 10);

                    //If we are on the first or second page, just show 1-5
                    if (page < 2) {
                        for (var i=0; i <= 4; i++) {
                            arr.push(scope.buildPaginationItem(i));
                        }
                    }
                    //We are nearing the end, ie. on one of the last 5 pages
                    else if(page > lastPage - 5) {
                        arr.push(scope.buildPaginationItem(lastPage - 5));
                        arr.push(scope.buildPaginationItem(lastPage - 4));
                        arr.push(scope.buildPaginationItem(lastPage - 3));
                        arr.push(scope.buildPaginationItem(lastPage - 2));
                        arr.push(scope.buildPaginationItem(lastPage - 1));
                    }
                    //Otherwise, show current page, and two before and two after
                    else {
                        arr.push(scope.buildPaginationItem(page - 2));
                        arr.push(scope.buildPaginationItem(page - 1));
                        arr.push(scope.buildPaginationItem(page));
                        arr.push(scope.buildPaginationItem(page + 1));
                        arr.push(scope.buildPaginationItem(page + 2));
                    }

                    scope.pagination = {
                        total: Math.ceil(results.numFound / 10),
                        pages: arr
                    };
                }

                /**
                * Call goToPage function passed from parent scope
                */
                scope.callGoToPage = function(page) {
                    if (page !== scope.currentPage) {
                        scope.goToPage()(page)
                    }
                }

                /**
                * Go back in pages, by the specified amount
                * If no amount given, default to 1 page
                */
                scope.prev = function(amount) {
                    amount = amount || 1;
                    if (scope.currentPage > amount - 1)  {
                        scope.callGoToPage(scope.currentPage - amount);
                    }

                }

                /**
                * Go forward in pages, by the specified amount
                * If no amount given, default to 1 page
                */
                scope.next = function(amount) {
                    amount = amount || 1;
                    if (scope.currentPage < scope.pagination.total - amount) {
                        scope.callGoToPage(scope.currentPage + amount);
                    }
                }

                scope.canGoBack10 = function() {
                    return scope.currentPage - 10 >= 0;
                }

                scope.canGoForward10 = function() {
                    return scope.currentPage + 10 < scope.results.numFound;
                }

                scope.$watch('results', function () {
                    scope.buildPagination(scope.results, scope.currentPage);
                });

                scope.$watch('page', function() {
                    scope.buildPagination(scope.results, scope.currentPage);
                });

                scope.buildPagination(scope.results, scope.currentPage);
            }
        };

    };

    return paginationDirective;

});
