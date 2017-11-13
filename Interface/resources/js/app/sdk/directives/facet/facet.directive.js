define([


], function() {

    var facetDirective = function facetDirective() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/facet/facet.directive.tpl.html',

            scope: {
                field: '=',
                facet: '=',
                buckets: '=',
                addFilter: '&',
                filterQueries: '='
            },

            link: function(scope, element, attr) {

                var defaultNumberOfItems = 10;

                scope.numberOfItems = defaultNumberOfItems;

                scope.notSelectedBucket = function(value, index, array) {
                    var bucketSelected = false;

                    angular.forEach(scope.filterQueries, function (filterQuery) {
                        if (scope.facet.field === filterQuery.facet.field) {
                            if (value.val === filterQuery.bucket.val) {
                                bucketSelected = true;
                            }
                        }
                    });

                    return !bucketSelected;
                };

                scope.showMore = function(fieldName) {
                    scope.numberOfItems = scope.numberOfItems + defaultNumberOfItems;
                };

                scope.callAddFilter = function(facet, bucket) {
                    scope.addFilter()(facet, bucket);
                }

                /**
                * Toggle visibility of selectable filter options
                */
                scope.toggle = function toggle() {
                    scope.active = !scope.active;
                }
            }
        }

    };

    return facetDirective;

});
