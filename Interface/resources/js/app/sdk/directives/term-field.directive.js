define([

], function() {

    var termFieldDirective = /* @ngInject */ function($http, $sce, TYPEAHEADMAXIUMUM) {
        return {

            restrict: 'E',

            scope: {
                data: '=',
                type: '=',
                submitFunc: '&'
            },

            template: '<ng-include src="getTemplateUrl()"></ng-include>',

            controller: /* @ngInject */ function($scope) {

                //default date for --date type fields
                $scope.defaultDate = "01-01-1850";

                $scope.showDatePicker = false;

                $scope.toggleDatePicker = function toggleDatePicker() {
                    $scope.showDatePicker = !$scope.showDatePicker;
                };

                $scope.ngModelOptions = {
                    updateOn: 'default'
                };

                $scope.options = [];

                /**
                *
                */
                $scope.getData = function getData(field, term) {

                    $scope.options = [];

                    //If we do not get any data source or a term to search for, do nothing
                    if (!field.datasource || !term) {
                        //Just return an empty array
                        return [];
                    }

                    if (term.length < 2) {
                        return [];
                    }

                    //Indicate that we are about to load new options
                    $scope.loading = true;

                    return $http({
                        url: field.datasource + encodeURIComponent(term),
                        method: 'GET',
                        cache: false
                    }).then(function(response) {

                        var arr = response.data.map(function(item) {
                            return item[field.datasourceValueField];
                        });

                        //Only show a set number of hits
                        $scope.options = arr.slice(0, TYPEAHEADMAXIUMUM);

                    }).finally(function() {
                        //Done loading
                        $scope.loading = false;
                    });

                };

                /**
                *
                */
                $scope.getTemplateUrl = function getTemplateUrl() {

                    var rtn;

                    //Fields with enum are also identified as being of type typeahead, but we do not have a datasource for them
                    //we there fore change the type for these fields, and handle them in a different template
                    if ($scope.type === 'typeahead' && $scope.data.field.enum && $scope.data.field.enum.length > 0) {
                        $scope.type = 'select';
                    }

                    switch ($scope.type) {
                        case 'select':
                            rtn = 'sdk/directives/term-field.directive--select.tpl.html';
                            break;
                        case 'typeahead':
                        case 'date':
                            rtn = 'sdk/directives/term-field.directive--' + $scope.type + '.tpl.html';
                            break;
                        case 'string':
                        default:
                            rtn = 'sdk/directives/term-field.directive--string.tpl.html';
                    }

                    return rtn;
                }
            }

        }
    };

    return termFieldDirective;

});
