define([

    'angular',
    'schemaForm',
    'angular-schema-form-bootstrap'

], function(ang, sfForm, sfBootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.controller('sfTypeahead', /*@ngInject*/  function($scope, $templateCache, $http, $filter) {

        $scope.options = [];

        //Custom model options for this element, nessesary to overwrite the default angular-schema-form options to
        //only update on blur. The typeahead should update instantly, while typing
        $scope.ngModelOptions = {
            updateOn: 'default'
        };

        $scope.toggleUnreadable = function toggleUnreadable(formElement) {
            formElement.unreadable = !formElement.unreadable;
        };

        $scope.getData = function getData(datasource, term, propertyName) {

            //If we do not get any datasourece or a term to search for, do nothing
            if (!datasource || !term) {
                //Just return an empty array
                return [];
            }

            return $http({
                url: datasource,
                method: 'GET',
                params: {
                    q: term
                }
            }).then(function(response) {
                
                var startsWith = $filter('startsWith')(response.data, term, propertyName);

                return startsWith; 
                
            });

        };

    });


    schemaForm.config( /*@ngInject*/ function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var typeahead = function(name, schema, options) {
            if (schema.type === 'typeahead' || (schema.type === 'string' && schema.format === 'typeahead')) {
                
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                
                f.key = options.path;
                f.type = 'typeahead';
                
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                
                return f;
            }
        };

        schemaFormProvider.defaults.string.unshift(typeahead);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'typeahead',
            'shared/schemaformAddon/typeahead.addon.tpl.html'
        );

    });

});
