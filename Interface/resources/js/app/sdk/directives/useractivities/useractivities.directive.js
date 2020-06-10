define([

], function() {
    var useractivitiesDirective = /*@ngInject*/ function (EDITOR_URL, userService, taskService) {
        return {
            restrict: 'E',

            scope: {},

            templateUrl: 'sdk/directives/useractivities/useractivities.directive.tpl.html',

            controller: ['$scope', function ($scope) {

                $scope.loading = false;
                $scope.activities = [];
                $scope.tasks = [];
        
                $scope.userId = null;
        
                $scope.EDITORURL = EDITOR_URL;
        
                $scope.init = function() {
        
                    $scope.loading = true;
        
                    taskService.getTasks().then(function (response) {
                        response.forEach(function (task) {
                            $scope.tasks[task.id] = task;
                        });
                        userService.getUserActivities().then(function (response) {
                            $scope.activities = response.filter(function (activity) {
                                return activity.task_unit_pages_done < activity.unit_pages;
                            });
                        }).finally(function () {
                            $scope.loading = false;
                        });
                    });
                };
        
                //Initialize logic
                $scope.init();
        
            }]
        }
    }

    return useractivitiesDirective;
});
