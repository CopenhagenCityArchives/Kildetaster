define([

    'angular'

], function(ang) {

    var dynamicInputDirective = function dynamicInputDirective() {

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData'
            },

            templateUrl: 'shared/directives/dynamicInput.directive.tpl.html',
            
            link: function(scope, element, attrs) {

            //http://blog.backand.com/build-dynamic-forms/
           //      if (!scope.value.val){
           //    scope.value.val = scope.field.defaultValue;
           // };


            }
        };
    };

    return dynamicInputDirective;

});