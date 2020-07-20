define([

], function() {
    var useractivitiesDirective = ['EDITOR_URL', 'userService', 'taskService', '$window', function(EDITOR_URL, userService, taskService, $window) {
        return {
            restrict: 'E',

            scope: {},

            template: require('./useractivities.directive.tpl.html'),

            controller: ['$scope', function ($scope) {
                $scope.loading = true;
                $scope.error = false;

                $scope.activities = [];
                $scope.tasks = [];
        
                taskService.getTasks().then(function (response) {
                    response.forEach(function (task) {
                        $scope.tasks[task.id] = task;
                    });
                    userService.getUserActivities().then(function (response) {
                        $scope.activities = response.filter(function (activity) {
                            return activity.task_unit_pages_done < activity.unit_pages;
                        });
                    })
                    .catch(function() {
                        $scope.error = true;
                    })
                    .finally(function () {
                        $scope.loading = false;
                    });
                });

                $scope.goToEditor = function(activity) {
                    $window.open(EDITOR_URL + "/#/task/" + activity.task_id + "/page/" + activity.page_id);
                }
            }]
        }
    }];

    return useractivitiesDirective;
});
