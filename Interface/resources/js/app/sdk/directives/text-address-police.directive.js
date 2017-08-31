define([

], function() {

    var directive =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-address-police.directive.tpl.html',

            scope: {
                address: '='
            },

            link: function(scope, element, attr) {
                var floorNumber = /^\d+\.$/
                if (scope.address && scope.address.floor && floorNumber.test(scope.address.floor)) {
                    scope.address.floor += " sal";
                }
            }
        };

    };

    return directive;
});
