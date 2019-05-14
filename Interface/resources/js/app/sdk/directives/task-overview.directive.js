define([], function () {

    var taskOverviewDirective =  /*@ngInject*/ function (taskService) {
        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/task-overview.directive.tpl.html',

            scope: {
                'taskId': '=',
                'yearPattern': '@'
            },

            link: function (scope, element, attr) {
                var yearRegex = new RegExp(scope.yearPattern.replace(/_s/g, "^").replace(/_d/g, "\\d"));
                scope.decades = {};
                taskService.getUnits({
                    task_id: scope.taskId
                }).then(function (response) {
                    response.forEach(unit => {
                        var result = yearRegex.exec(unit.description);
                        if (result && result.length == 2) {
                            var year = parseInt(result[1]);
                            var decade = Math.floor(year / 10) * 10;
                            if (!scope.decades[decade]) {
                                scope.decades[decade] = [unit];
                            }
                            else {
                                scope.decades[decade].push(unit);
                            }
                        }
                    });
                });

                scope.getWidth = function (decade) {
                    return 100 / scope.decades[decade].length;
                }
            }
        };
    };

    return taskOverviewDirective;

});