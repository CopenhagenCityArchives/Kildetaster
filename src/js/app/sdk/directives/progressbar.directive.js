define([

], function() {

    var progressbarDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            template: require('./progressbar.directive.tpl.html'),
            
            scope: {
                totalPages: '=',
                donePages: '='
            },
            
            link: function(scope, element, attr) {

                /**
                * Calculate progress in %;
                */
                scope.calcProgress = function calcProgress() {
                    return 100 - Math.round(((scope.totalPages - scope.donePages) / scope.totalPages) * 100);
                };

                scope.showPercentage = function() {
                    return scope.calcProgress > 0;
                }


            }
        };

    };

    return progressbarDirective;

});