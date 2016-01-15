define([

    'angular',
    'schemaForm',
    'angular-schema-form-bootstrap'

], function(ang, sfForm, sfBootstrap) {


var schemaForm = angular.module('schemaForm');


    var typeaheadAddon = /*@ngInject*/ function dynamicTypeaheadDirective($rootScope, $http, Flash) {

        //TODO REMOVE
        return;

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData',
                target: '=',
                autofocus: '='
            },

            templateUrl: 'shared/directives/dynamicTypeahead.directive.tpl.html',
            
            link: function(scope, element, attrs) {
                //Make TEXT available in local scope
                scope.TEXT = $rootScope.TEXT;

                scope.options = [];

                scope.getOptions = function() {

                    return $http.get(scope.field.formSource).then(function(response) {
                        scope.options = response.data;
                    }).catch(function(err) {
                        Flash.create('danger', 'Kunne ikke hente data til: ' + scope.field.fieldName);
                    });

                };

                scope.getOptions();


                scope.toggleUnreadable = function toggleUnreadable() {
                    var prop = scope.field.unreadable;
                    scope.field.unreadable = prop ? false : true;
                };

                //If we are supposed to set autofocus to the field
                if (scope.autofocus) {
                    //Do so
                    $(element[0]).find('input').focus();
                }
                
            }
        };
    };


    schemaForm.controller('sfTypeahead', /*@ngInject*/  function($scope, $templateCache, $q) {

        $scope.options = [];
        $scope.init = function init() {
            console.log('loading data and stuffs');

            $scope.getData().then(function(response) {
                $scope.options = response;
                console.log(response);
            });


        };

        $scope.getData = function getData() {

            var deferred = $q.defer();

            var mockValue =  [ {name: "First", id: 1}, {name: "Second", id: 2}];

            deferred.resolve(mockValue);

            return deferred.promise;
            
        };

    });


    schemaForm.config( /*@ngInject*/ function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var typeahead = function(name, schema, options) {
            if (schema.type === 'string' && schema.format === 'typeahead') {
                
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

        // schemaFormDecoratorsProvider.createDirective(
        //      'typeaheadAddon',
        //      'directives/decorators/bootstrap/datepicker/datepicker.html'
        // );
    });

    return typeaheadAddon;

});
