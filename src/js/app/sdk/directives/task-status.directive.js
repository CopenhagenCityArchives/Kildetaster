define([], function () {

    var taskStatusDirective =  ['taskService', function(taskService) {

        // Counter for how many times the directive has been used, used to build unique id's
        var num = 0;
        return {
            restrict: 'E',

            template: require('./task-status.directive.tpl.html'),

            scope: {
                'taskId': '='
            },

            link: function (scope, element, attr) {
                console.log(num);
                scope.num = num;
                scope.unitsCount = 0;
                scope.activeUnitsCount = 0;
                scope.unitsDoneCount = 0;
                scope.unitsDoingCount = 0;

                taskService.getTask(scope.taskId)
                    .then(function (response) {
                        scope.task = response;
                    });

                taskService.getUnits({
                    task_id: scope.taskId
                }).then(function (response) {
                    // open/active units count
                    scope.activeUnitsCount = response.length;

                    // compute done and doing counts
                    response.forEach(function(unit) {
                        if (unit.pages_done == unit.pages)
                            scope.unitsDoneCount++;
                        else if (unit.pages_done > 0)
                            scope.unitsDoingCount++;
                    });

                    // also get inactive to compute total count
                    taskService.getUnits({
                        task_id: scope.taskId,
                        index_active: 0
                    }).then(function (inactiveResponse) {
                        scope.unitsCount = response.length + inactiveResponse.length;
                    });
                });
                // Increment the counter for other instances of the directive
                num++;
            }
        };
    }];

    return taskStatusDirective;

});