define([


], function() {

    var searchDirective = /*@ngInject*/ function(API, $state, helpers, searchService) {

        return {

            restrict: 'E',
            replace: true,

            scope: {
                result: '=',
                config: '=',
                //The index this posts is in, based on the current visibile results
                index: '=',
                //The page (in pagination) we are currently on
                page: '='
            },

            templateUrl: 'sdk/directives/searchresult.directive.tpl.html',

            link: function(scope, element, attr) {

                if (scope.result && scope.result.jsonObj) {
                    scope.jsonData = JSON.parse(scope.result.jsonObj);
                    scope.data = scope.jsonData.data;

                    //HACK START
                    // takes the dateOfDeath from the data and overwrites the wrongfully formatted dateOfDeath in the jsonObj data
                    //This should be removed when the API is updated to return the correct date format (a timestamp)
                    scope.data.dateOfDeath = scope.result.dateOfDeath;
                    //HACK END

                    scope.metadata = scope.jsonData.metadata;
                }

                scope.goToPost = function() {

                    searchService.currentIndex = scope.page + scope.index;

                    $state.go('search.page.result.page', {
                        postId: scope.result.post_id
                    });
                };

                scope.$on('$destroy', function() {
                    //console.log('destroyed');
                });

            }
        };

    };

    return searchDirective;

});
