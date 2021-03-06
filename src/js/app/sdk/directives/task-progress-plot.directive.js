define([], function () {

    var taskProgressPlotDirective = ['taskService', '$q', function(taskService, $q) {
        return {
            restrict: 'E',

            template: require('./task-progress-plot.directive.tpl.html'),

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
                })
                .then(function (response) {
                    response.forEach(function(unit) {
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

                    // Ensure sorting of units within decades
                    Object.keys(scope.decades).forEach(function (decade) {
                        scope.decades[decade].sort(function(unitA, unitB) {
                            return unitA.description > unitB.description ? 1 : - 1;
                        });
                    });
                });

                scope.inactive = function (unit) {
                    return unit.index_active == 0;
                }

                scope.done = function (unit) {
                    return !scope.inactive(unit) && unit.pages == unit.pages_done;
                }

                scope.pending = function (unit) {
                    return !scope.inactive(unit) && unit.pages_done == 0;
                }

                scope.starting = function (unit) {
                    return !scope.inactive(unit) && !scope.pending(unit) && unit.pages_done / unit.pages < 0.5;
                }

                scope.finishing = function (unit) {
                    return !scope.inactive(unit) && !scope.done(unit) && unit.pages_done / unit.pages >= 0.5;
                }

                scope.getWidth = function (decade) {
                    return 100 / scope.decades[decade].length;
                }
            }
        };
    }];

    return taskProgressPlotDirective;

});