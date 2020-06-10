define([

], function() {
    var useractivitiesDirective = /*@ngInject*/ function (EDITOR_URL, userService, taskService) {
        return {
            restrict: 'E',

            scope: {},

            templateUrl: 'sdk/directives/useractivities/useractivities.directive.tpl.html',

            controller: ['$scope', function ($scope) {
                $scope.loading = true;
                $scope.error = false;

                $scope.activities = [];
                $scope.tasks = [];
        
                $scope.EDITORURL = EDITOR_URL;
    
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
            }]
        }
    }

    return useractivitiesDirective;
});
