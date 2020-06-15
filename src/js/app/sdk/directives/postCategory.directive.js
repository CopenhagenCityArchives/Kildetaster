define([

], function() {

    var postfieldDirective =  function() {

        return {
            restrict: 'E',

            template: require('./postCategory.directive.tpl.html'),

            scope: {
                data: '=',
                errorReporting: '=',
                showEmptyFields: '=',
                report: '&'
            },

            link: function(scope, element, attr) {

                scope.showErrorForm = false;

                /**
                * Toggle visibility of the error form
                */
                scope.toggleErrorReporting = function() {
                    scope.data.showErrorForm = !scope.data.showErrorForm;
                };

                /**
                * Send error report using function given through directive
                */
                scope.doReport = function(group) {

                    scope.report({
                        fieldData: group
                    });

                    scope.showErrorsForm = false;

                };

            }
        };

    };

    return postfieldDirective;

});
