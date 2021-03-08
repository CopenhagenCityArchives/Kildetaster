define([
    'angular',
    'angular-schema-form',
    'angular-schema-form-bootstrap'
], function(ang, sfForm, sfBootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.controller('sfTypeahead', ['$scope', 'API_URL', '$http', 'TYPEAHEAD_MAX', function($scope, API_URL, $http, TYPEAHEAD_MAX) {
        let that = this;
        $scope.options = [];
        $scope.minimumInputLength = 2

        //Custom model options for this element, nessesary to overwrite the default angular-schema-form options to
        //only update on blur. The typeahead should update instantly, while typing
        $scope.ngModelOptions = {
            updateOn: 'default'
        };

        $scope.getMinimumInputLength = function() {
            return $scope.minimumInputLength
        }

        $scope.init = function(form) {
            that.form = form;

            // check if schema for the field contains minimumInputLength, otherwise fallback to default 2
            $scope.minimumInputLength = typeof form.schema.minimumInputLength == 'number' ? form.schema.minimumInputLength : 2
        }

        $scope.toggleUnreadable = function toggleUnreadable(formElement) {
            formElement.unreadable = !formElement.unreadable;
        };

        $scope.getData = function getData(term) {
            let codeAllowNewValue = that.form.schema.codeAllowNewValue
            let datasources_id = that.form.schema.datasources_id
            let propertyName = that.form.schema.datasourceValueField

            $scope.options = [];

            //If we do not get any datasourece or a term to search for, do nothing
            if (!datasources_id || typeof term !== 'string') {
                return
            }

            if (term.length < $scope.minimumInputLength) {
                return
            }

            //Indicate that we are about to load new options
            $scope.loading = true;
            var datasourceUrl = API_URL + '/datasource/' + datasources_id + '/?q=' + encodeURIComponent(term);
            return $http({
                url: datasourceUrl,
                method: 'GET',
                cache: false
            }).then(function(response) {

                var arr = response.data.map(function(item) {
                    return item[propertyName.toLowerCase()];
                });

                //Only show a set number of hits
                $scope.options = arr.slice(0, TYPEAHEAD_MAX);

                // If new values are allowed and the term is not exactly any existing option,
                // push it onto the options array
                if (codeAllowNewValue && $scope.options.filter(function(val) { return val == term }).length == 0 && term.length > 0) {
                    $scope.options.unshift(term)
                }

            }).finally(function() {
                //Done loading
                $scope.loading = false;
            });

        };

        $scope.populate = function(term) {
            if ($scope.options && $scope.options.length > 0 || $scope.minimumInputLength > term.length) {
                return
            }

            $scope.getData(term)
        }

    }]);


    schemaForm.config( ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

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
            'schemaFormTypeahead.tpl.html'
        );

    }]);

    schemaForm.run(['$templateCache', function($templateCache) {
        $templateCache.put('schemaFormTypeahead.tpl.html', require('./typeahead.addon.tpl.html'));
    }])

});
