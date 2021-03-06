define([


], function() {

    var facetDirective = function facetDirective() {

        return {
            restrict: 'E',

            template: require('./facet.directive.tpl.html'),

            scope: {
                field: '=',
                facet: '=',
                buckets: '=',
                addFilter: '&',
                filterQueries: '='
            },

            controller: ['$scope', function($scope) {
                // figure out if bucket was selected or unselected
                $scope.isBucketInFilterQueries = function(facet, bucket) {
                    return $scope.filterQueries.findIndex(function(filterQuery) {
                        return filterQuery.bucket.val == bucket.val && filterQuery.facet.field == facet.field
                    }) != -1;
                }

                angular.forEach($scope.buckets, function(bucket) {
                    bucket.selected = $scope.isBucketInFilterQueries($scope.facet, bucket);
                });

                $scope.cleanBucketValueForId = function(val) {
                    if (typeof val === 'string') {
                        return val.replace(' ', '-');
                    } else {
                        return val;
                    }
                }

                $scope.increaseBucketsLimit = function() {
                    $scope.bucketsLimit += 10;
                }

                $scope.bucketsLimit = 10;
            }],

            link: function(scope, element, attr) {

                var defaultNumberOfItems = 10;

                scope.numberOfItems = defaultNumberOfItems;

                scope.showMore = function(fieldName) {
                    scope.numberOfItems = scope.numberOfItems + defaultNumberOfItems;
                };

                scope.callAddFilter = function(facet, bucket) {
                    scope.addFilter()(facet, bucket);

                    bucket.selected = scope.isBucketInFilterQueries(facet, bucket);

                    // collapse when selecting a filter
                    scope.toggle();
                }

                /**
                * Toggle visibility of selectable filter options
                */
                scope.toggle = function toggle() {
                    scope.active = !scope.active;

                    if (!scope.active) {
                        scope.numberOfItems = defaultNumberOfItems;
                    }
                }
            }
        }

    };

    return facetDirective;

});
