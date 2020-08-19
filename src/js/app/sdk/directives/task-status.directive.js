export default ['taskService', '$timeout', function(taskService, $timeout) {
    // Counter for how many times the directive has been used, used to build unique id's
    var num = 0;
    return {
        restrict: 'E',

        template: require('./task-status.directive.tpl.html'),

        scope: {
            'taskId': '='
        },

        link: function (scope, element, attr) {
            scope.num = num;
            scope.count = 0;
            scope.activeCount = 0;
            scope.doneCount = 0;
            scope.loading = true;

            taskService.getTask(scope.taskId)
            .then(function (response) {
                scope.task = response;
            });

            taskService.getUnits({
                task_id: scope.taskId         
            })
            .then(function (response) {
                // compute done and active counts
                response.forEach(function(unit) {
                    if (unit.pages_done == unit.pages)
                        scope.doneCount++;
                    else if (unit.pages_done > 0)
                        scope.activeCount++;
                });

                scope.count = response.length;
            })
            .finally(function () {
                scope.loading = false;
            });

            // Increment the counter for other instances of the directive
            num++;
        }
    };
}];