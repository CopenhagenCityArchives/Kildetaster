define([], function () {
    var userStatisticsDirective = /*@ngInject*/ function (userService) {
        return {
            restrict: 'E',
            templateUrl: 'sdk/directives/user-statistics.directive.tpl.html',
            scope: {},
            
            link: function(scope, element, attr) {
                scope.loading = true;
                userService.getUserStatistics()
                .then(function(stats) {
                    scope.stats = stats;
                })
                .catch(function(err) {
                    scope.error = true;
                })
                .finally(function() {
                    scope.loading = false;
                });
            }
        };
    };

    return userStatisticsDirective;
});