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
                    scope.result = JSON.parse(scope.result.jsonObj);
                    scope.data = scope.result.data;
                    scope.metadata = scope.result.metadata;

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
