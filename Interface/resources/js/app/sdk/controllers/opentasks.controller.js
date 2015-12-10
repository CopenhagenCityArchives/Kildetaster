define([



], function() {

    var opentasksController = /*@ngInject*/ function opentasksController($scope, taskService) {

        $scope.loading = false;
        $scope.tasks = [];



        $scope.calcProgress = function calcProgress(task) {

            return Math.round(((task.pagesTotal - task.pagesLeft) / task.pagesTotal) * 100);
        };


        $scope.init = function init() {

            $scope.loading = true;
            taskService.getTasks().then(function(response) {
                $scope.tasks = response;
            })
            .finally(function() {
                $scope.loading = false;
            });

        };


        $scope.init();



    };

    return opentasksController;

});