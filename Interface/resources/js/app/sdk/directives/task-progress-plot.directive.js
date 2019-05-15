define([], function () {

    var taskProgressPlotDirective =  /*@ngInject*/ function (taskService) {
        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/task-progress-plot.directive.tpl.html',

            scope: {
                'taskId': '=',
                'legend': '=',
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

                // Ensure sorting of units within decades
                Object.keys(scope.decades).forEach(function (decade) {
                    scope.decades[decade].reverse();
                });

                scope.done = function (unit) {
                    return unit.pages == unit.pages_done;
                }

                scope.pending = function (unit) {
                    return unit.pages == 0;
                }

                scope.starting = function (unit) {
                    return !scope.pending(unit) && unit.pages_done / unit.pages < 0.5;
                }

                scope.finishing = function (unit) {
                    return !scope.done(unit) && unit.pages_done / unit.pages >= 0.5;
                }

                scope.getWidth = function (decade) {
                    return 100 / scope.decades[decade].length;
                }
            }
        };
    };

    return taskProgressPlotDirective;

});