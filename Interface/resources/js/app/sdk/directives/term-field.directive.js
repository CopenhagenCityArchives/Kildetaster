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

                /**
                * Local proxy function to handle sending function parameters
                */
                $scope.doSubmit = function($event) {
                    //Call function from invoking controller, passing in our event object
                    $scope.submitFunc({ event: $event });
                }

                $scope.ngModelOptions = {
                    updateOn: 'default'
                };

                //Options to show when rendered as a typeahead or select
                $scope.options = [];

                //$scope.lastTerm = undefined;
                // $scope.lastField = undefined;

                //Default placeholder
                $scope.placeholder = 'Søgeterm';

                /**
                *
                */
                $scope.getData = function getData(field, term) {
                    // If we have an enum
                    if ($scope.type === 'typeahead' && $scope.data.field.enum && $scope.data.field.enum.length > 0) {
                        return field.enum;
                    }

                    //If we do not get any data source, do nothing
                    if (!field.datasource) {
                        //Just return an empty array
                        return [];
                    }

                    // If the field name is the same as the last field, do nothing
                    /*if(field.name === $scope.lastField) {
                        return;
                    }*/


                    // Store used term, for next getData call
                    //$scope.lastTerm = term;
                    // // Store used field name, for next getData call
                    //$scope.lastField = field.name;

                    // Remove options, before populating the list again
                    $scope.options = [];

                    //Indicate that we are about to load new options
                    $scope.loading = true;

                    return $http({
                        url: field.datasource.url + encodeURIComponent(term),
                        method: 'GET',
                        cache: false
                    }).then(function(response) {
                        var arr = response.data.map(function(item) {
                            return { label: item[field.datasource.field], value: item[field.datasource.field] };
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
                        return 'sdk/directives/term-field.directive--select.tpl.html';
                    }

                    switch ($scope.type) {
                        case 'typeahead':
                            rtn = 'sdk/directives/term-field.directive--' + $scope.type + '.tpl.html';
                            break;
                        case 'date':
                            $scope.placeholder = 'dd-mm-åååå';
                            rtn = 'sdk/directives/term-field.directive--date.tpl.html';
                            break;
                        case 'string':
                        case 'string_multivalued':
                        case 'number':
                        default:
                            $scope.placeholder = 'Søgeterm';
                            rtn = 'sdk/directives/term-field.directive--string.tpl.html';
                    }

                    return rtn;
                }
            }

        }
    };

    return termFieldDirective;

});
