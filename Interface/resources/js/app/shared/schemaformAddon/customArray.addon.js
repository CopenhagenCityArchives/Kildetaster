define([

    'angular',
    'schemaForm',
    'angular-schema-form-bootstrap'

], function(ang, sf, sfbootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.config(function(schemaFormDecoratorsProvider, sfBuilderProvider) {

        //Define a custom decorator for array type constructs. We need to be able to change the html
        //The template is more or less the default one, exepct that we explicitly remove the 'Remove' button
        //From the tabindex
        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator', // Name of the decorator you want to add to.
            'array', // Form type that should render this add-on
            'shared/schemaformAddon/customArray.addon.tpl.html', // Template name in $templateCache
            sfBuilderProvider.stdBuilders // List of builder functions to apply.
        );

    });

    return function() {};

});
