define([], function () {
    var userStatisticsDirective = /*@ngInject*/ function (userService) {
        return {
            restrict: 'E',
            template: require('./user-statistics.directive.tpl.html'),
            scope: {},
            
            link: function($scope) {
                $scope.loading = true;
                $scope.error = false;

                $scope.day = [];
                $scope.dayError = false;
                $scope.dayLoading = true;

                $scope.week = [];
                $scope.weekError = false;
                $scope.weekLoading = true;

                $scope.ever = [];
                $scope.everError = false;
                $scope.everLoading = true;

                $scope.activeTab = 'day';
                
                var dayTimestamp = Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60;
                var weekTimestamp = Math.floor(new Date().getTime() / 1000) - 7 * 24 * 60 * 60;
                var everTimestamp = 1;

                userService.getUserStatistics(dayTimestamp)
                .then(function(stats) {
                    $scope.day = stats;
                })
                .catch(function(err) {
                    $scope.dayError = true;
                })
                .finally(function() {
                    $scope.dayLoading = false;
                });

                userService.getUserStatistics(weekTimestamp)
                .then(function(stats) {
                    $scope.week = stats;
                })
                .catch(function(err) {
                    $scope.weekError = true;
                })
                .finally(function() {
                    $scope.weekLoading = false;
                });

                userService.getUserStatistics(everTimestamp)
                .then(function(stats) {
                    $scope.ever = stats;
                })
                .catch(function(err) {
                    $scope.everError = true;
                })
                .finally(function() {
                    $scope.everLoading = false;
                });
                
            }
        };
    };

    return userStatisticsDirective;
});