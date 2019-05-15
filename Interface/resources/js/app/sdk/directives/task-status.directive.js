define([], function () {

    var taskStatusDirective =  /*@ngInject*/ function (taskService) {
        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/task-status.directive.tpl.html',

            scope: {
                'taskId': '='
            },

            link: function (scope, element, attr) {
                scope.unitsCount = 0;
                scope.unitsDoneCount = 0;
                scope.unitsDoingCount = 0;

                taskService.getTask(scope.taskId)
                    .then(function (response) {
                        console.log(response);
                        scope.task = response;
                    });

                taskService.getUnits({
                    task_id: scope.taskId
                }).then(function (response) {
                    scope.unitsCount = response.length;
                    response.forEach(unit => {
                        if (unit.pages_done == unit.pages)
                            scope.unitsDoneCount++;
                        else if (unit.pages_done > 0)
                            scope.unitsDoingCount++;
                    });
                });
            }
        };
    };

    return taskStatusDirective;

});