define([



], function() {

    var opentasksController = /*@ngInject*/ function opentasksController(tokenService, $scope, $http, taskService, pageService, EDITORURL) {

        $scope.loading = false;
        $scope.units = [];

        /**
        * Get the next available pageId, and redirect the user to that page in the editor
        */
        $scope.goToEditor = function goToEditor(unit) {

            pageService.getNextAvailablePage({
                task_id: unit.tasks_id,
                unit_id: unit.units_id
            }).then(function(response) {
                var pageId = response.pages_id;
                window.open(EDITORURL + '/#/task/' + unit.tasks_id + '/page/' + pageId, '_blank');
            });
        };

        $scope.init = function init(data) {

            if (!data.taskId) {
                throw new Error("No task id given");
            }

            $scope.loading = true;

            taskService.getUnits({
                task_id: data.taskId
            }).then(function(response) {
                $scope.units = response;
            })
            .finally(function() {
                $scope.loading = false;
            });

        };

    };

    return opentasksController;

});
