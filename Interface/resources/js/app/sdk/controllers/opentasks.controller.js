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

        $scope.init = function init(taskId) {

            //TODO: Update logic for after beta, to not just use a hardcoded value
            taskId = taskId || 1;

            $scope.loading = true;

            taskService.getUnits({
                taskId: taskId
            }).then(function(response) {
                $scope.units = response;
            })
            .finally(function() {
                $scope.loading = false;
            });

        };

        //TODO: Remove hardcoded taskId
        $scope.init({ taskId: 1 });

        
    };

    return opentasksController;

});