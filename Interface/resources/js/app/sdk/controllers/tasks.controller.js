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
                if(response.pages_id){
                    var pageId = response.pages_id;
                    window.open(EDITORURL + '/#/task/' + unit.tasks_id + '/page/' + pageId, '_blank');
                }
            });
        };

        $scope.init = function init(data) {

            if (!data.taskId) {
                throw new Error("Task: No task id given");
            }

            if (!data.showOpen && !data.showFinished) {
                throw new Error('Task: Not set to display any tasks!');
            }

            $scope.loading = true;

            taskService.getUnits({
                task_id: data.taskId
            }).then(function(response) {
                //show everything
                if (data.showOpen && data.showFinished) {
                    $scope.units = response;
                }
                //Only show open tasks
                else if (data.showOpen && !data.showFinished) {
                    $scope.units = response.filter(function(unit) {
                        return unit.pages_done < unit.pages;
                    });
                }
                //Only show closed tasks
                else if (!data.showOpen && data.showFinished) {
                    $scope.units = response.filter(function(unit) {
                        return unit.pages_done === unit.pages;
                    });
                }

            })
            .finally(function() {
                $scope.loading = false;
            });

        };

    };

    return opentasksController;

});
