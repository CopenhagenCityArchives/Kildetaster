define([

    'angular',
    'angular-schema-form',
    'angular-schema-form-bootstrap'

], function(ang, sf, sfbootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.controller('sfCustomInput', ['$scope', '$templateCache', '$q', '$http', function($scope, $templateCache, $q, $http) {

        $scope.options = [];

        //Custom model options for this element, nessesary to overwrite the default angular-schema-form options to
        //only update on blur. The typeahead should update instantly, while typing
        $scope.ngModelOptions = {
            updateOn: 'default'
        };

        $scope.toggleUnreadable = function toggleUnreadable(formElement) {
            formElement.unreadable = !formElement.unreadable;
            //formElement.required = false;
            
            console.log(formElement);
        };

        $scope.init = function init() {
            //Nothing yet
        };

    }]);


    schemaForm.directive('handleUnreadable', ['$parse', function($parse) {

        return {

            require: 'ngModel',
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            
            link: function (scope, element, attrs, modelCtrl) {
                
                scope.$watch(
                    function () { return element.attr('unreadable'); },
                    function(newVal) {
                    
                        if (newVal) {
                            scope.ngModel = -1;
                        }
                    });
            }

        };
    }]);
    
    schemaForm.config( ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var custominput = function(name, schema, options) {

            //Type of string, but without a specific format
            if (schema.type === 'string' && schema.format === undefined && schema.enum === undefined) {

                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'custominput';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };
        
        var customnumber = function(name, schema, options) {

            //Type of number, but without a specific format
            if (schema.type === 'number' && schema.format === undefined && schema.enum === undefined) {

                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'number';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        // Put it first in the list of functions
        schemaFormProvider.defaults.string.unshift(custominput);
                
        schemaFormProvider.defaults.number.unshift(customnumber);


        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'custominput',
            'schemaFormCustomInput.tpl.html'
        );

        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'number',
            'schemaFormCustomInput.tpl.html'
        );
    }]);

    schemaForm.run(['$templateCache', function($templateCache) {
        $templateCache.put('schemaFormCustomInput.tpl.html', require('./customInput.addon.tpl.html'));
    }])


    return function() {};

});
