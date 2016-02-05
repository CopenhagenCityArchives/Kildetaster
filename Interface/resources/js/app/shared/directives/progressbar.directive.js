define([

    'angular'

], function(ang) {

    var progressbarDirective = /*@ngInject*/ function userDirective() {

        return {

            restrict: 'E',
            replace: true,

            scope: {
                percentage: '='
            },

            templateUrl: 'shared/directives/progressbar.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                console.log(scope);

            }
        };
    };

    return progressbarDirective;

});