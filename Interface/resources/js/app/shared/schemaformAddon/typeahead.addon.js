define([

    'angular',
    'schemaForm',
    'angular-schema-form-bootstrap'

], function(ang, sfForm, sfBootstrap) {


    var schemaForm = angular.module('schemaForm');


    schemaForm.controller('sfTypeahead', /*@ngInject*/  function($scope, $templateCache, $q, $http) {

        $scope.options = [];

        //Custom model options for this element, nessesary to overwrite the default angular-schema-form options to
        //only update on blur. The typeahead should update instantly, while typing
        $scope.ngModelOptions = {
            updateOn: 'default'
        };

        $scope.toggleUnreadable = function toggleUnreadable(formElement) {
            formElement.unreadable = !formElement.unreadable;
        };

        $scope.init = function init() {

            //TODO handle cache data
            $scope.getData().then(function(response) {
                $scope.options = response;
            });

        };

        $scope.blur = function blur(model) {

            model.$parsers.push(function(val) {
                console.log('hit', arguments);

                return { 
                    id: undefined, 
                    name: val
                };
            });

            // model.$modelValue = {
            //     name: "hans"
            // };
            // console.log("I am blurred", model.$modelValue);
            // model.$render();
        };

        $scope.onSelect = function onSelect($item, $model, $label, $event) {
            console.log('argu', arguments);
        };

        $scope.getData = function getData() {

            var deferred = $q.defer();
            
            $http.get('/resources/mock/deathCause.json').then(function(response) {
                deferred.resolve(response.data);
            });

            return deferred.promise;
            
        };

    });


    schemaForm.config( /*@ngInject*/ function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var typeahead = function(name, schema, options) {
            if (schema.type === 'typeahead' || (schema.type === 'object' && schema.format === 'typeahead')) {
                
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                
                f.key = options.path;
                f.type = 'typeahead';
                
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                
                return f;
            }
        };

        schemaFormProvider.defaults.object.unshift(typeahead);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'typeahead',
            'shared/schemaformAddon/typeahead.addon.tpl.html'
        );

    });

});
