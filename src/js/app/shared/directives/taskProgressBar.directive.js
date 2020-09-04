var progressBarDirective = [
function() {
    return {

        restrict: 'E',
        replace: true,

        scope: {
            pagesTotal: '=',
            pagesDone: '='
        },

        template: require('./taskProgressbar.directive.tpl.html'),
        
        link: function(scope, element, attrs) {

            scope.percentage = 0;

            scope.$watchGroup(['pagesDone', 'pagesTotal'], function(newValues) {
                scope.percentage = Math.round(parseInt(newValues[0]) / parseInt(newValues[1]) * 100);
            });
        }
    };
}];

export default progressBarDirective;