define([



], function() {

    var opentasksController = /*@ngInject*/ function opentasksController($scope, $http, taskService, pageService) {

        $scope.loading = false;

        $scope.units = [];

        $scope.taskId = 1;

        /**
        * Calculate progress in %;
        */
        $scope.calcProgress = function calcProgress(unit) {
            return 100 - Math.round(((unit.pages - unit.tasks[0].pages_done) / unit.pages) * 100);
        };

        /**
        * Get the next available pageId, and redirect the user to that page in the editor
        */
        $scope.goToEditor = function goToEditor(unit) {

            pageService.getNextAvailablePage({
                task_id: $scope.taskId,
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