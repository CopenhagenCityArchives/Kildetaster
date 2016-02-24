define([



], function() {

    var opentasksController = /*@ngInject*/ function opentasksController($scope, $http, taskService, pageService) {

        $scope.loading = false;

        $scope.units = [];

        /**
        * Get the next available pageId, and redirect the user to that page in the editor
        */
        $scope.goToEditor = function goToEditor(unit) {

            pageService.getNextAvailablePage({
                task_id: unit.tasks[0].tasks_id,
                unit_id: unit.id
            }).then(function(response) {
                var pageId = response.data[0].pages_id;
                window.location.href = 'http://localhost/#/task/' + $scope.taskId + '/page/' + pageId;

            });
        };


        $scope.init = function init() {

            $scope.loading = true;

            taskService.getUnits({
                taskId: $scope.taskId
            }).then(function(response) {
                $scope.units = response;
            })
            .finally(function() {
                $scope.loading = false;
            });

        };

        $scope.init();

    };

    return opentasksController;

});