define([], function () {
    var userStatisticsDirective = /*@ngInject*/ function (userService) {
        return {
            restrict: 'E',
            templateUrl: 'sdk/directives/user-statistics.directive.tpl.html',
            scope: {
                'sinceDays': '='
            },
            
            link: function(scope, element, attr) {
                scope.loading = true;
                scope.error = false;

                if (!scope.sinceDays) {
                    scope.sinceDays = 1;
                }

                var unix = Math.floor(new Date().getTime() / 1000) - scope.sinceDays * 24 * 60 * 60;

                userService.getUserStatistics(unix)
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