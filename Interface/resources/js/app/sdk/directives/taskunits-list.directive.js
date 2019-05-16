define([], function () {
    var taskunitsListDirective = /*@ngInject*/ function (taskService, pageService, EDITORURL) {
        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/taskunits-list.directive.tpl.html',

            scope: {
                'taskId': '='
            },

            link: function (scope, element, attr) {
                scope.loading = true;
                scope.units = [];
                taskService.getUnits({
                    task_id: scope.taskId
                }).then(function (response) {
                    scope.units = response.filter(function (unit) {
                        return unit.pages_done < unit.pages;
                    });
                }).finally(function () {
                    scope.loading = false;
                });

                /**
                 * Get the next available pageId, and redirect the user to that page in the editor
                 */
                scope.goToEditor = function goToEditor(unit) {
                    pageService.getNextAvailablePage({
                        task_id: unit.tasks_id,
                        unit_id: unit.units_id
                    }).then(function (response) {
                        if (response.pages_id) {
                            var pageId = response.pages_id;
                            window.open(EDITORURL + '/#/task/' + unit.tasks_id + '/page/' + pageId, '_blank');
                        }
                    });
                };
            }
        }
    }

    return taskunitsListDirective;
});