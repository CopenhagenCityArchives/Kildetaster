define([

    'angular',
    'angular-schema-form',
    'angular-schema-form-bootstrap'

], function(ang, sf, sfbootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.controller('sfCustomSelect', /*@ngInject*/  function($scope, $templateCache) {

    });
    
    schemaForm.config( /*@ngInject*/ function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {


        var customselect = function(name, schema, options) {
            //Type of string, but without a specific format
            if (schema.type === 'string' && schema.enum !== undefined) {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'customselect';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        // Put it first in the list of functions
        schemaFormProvider.defaults.string.unshift(customselect);

        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'customselect',
            'shared/schemaformAddon/customSelect.addon.tpl.html'
        );
       
    });

    return function() {};

});
