define([
    'angular'
], function(angular) {

    var termFieldDirective = ['$http', '$sce', 'API_URL', 'TYPEAHEAD_MAX', function($http, $sce, API_URL, TYPEAHEAD_MAX) {

        var template = "";

        return {

            restrict: 'E',

            scope: {
                data: '=',
                type: '=',
                submitFunc: '&'
            },

            template: '<div></div>',

            controller: ['$scope', '$compile', '$element', function($scope, $compile, $element) {


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

                    // Remove options, before populating the list again
                    $scope.options = [];

                    //Indicate that we are about to load new options
                    $scope.loading = true;

                    var datasourceUrl = field.datasource.url + encodeURIComponent(term);
                    if (!datasourceUrl.startsWith('http')) {
                        datasourceUrl = API_URL + '/' + datasourceUrl;
                    }
                    return $http({
                        url: datasourceUrl,
                        method: 'GET',
                        cache: false
                    }).then(function(response) {
                        var arr = response.data.map(function(item) {
                            return { label: item[field.datasource.field], value: item[field.datasource.field] };
                        });

                        //Only show a set number of hits
                        $scope.options = arr.slice(0, TYPEAHEAD_MAX);

                    }).finally(function() {
                        //Done loading
                        $scope.loading = false;
                    });

                };

                /**
                *
                */
                $scope.getTemplate = function getTemplate() {
                    //Fields with enum are also identified as being of type typeahead, but we do not have a datasource for them
                    //we there fore change the type for these fields, and handle them in a different template
                    if ($scope.type === 'typeahead' && $scope.data.field.enum && $scope.data.field.enum.length > 0) {
                        return require('./term-field.directive--select.tpl.html');
                    }

                    switch ($scope.type) {
                        case 'typeahead':
                            return require('./term-field.directive--' + $scope.type + '.tpl.html');
                        case 'date':
                            $scope.placeholder = 'dd-mm-åååå';
                            return require('./term-field.directive--date.tpl.html');
                        case 'string':
                        case 'string_multivalued':
                        case 'number':
                        default:
                            $scope.placeholder = 'Søgeterm';
                            return require('./term-field.directive--string.tpl.html');
                    }
                }

                angular.element($element).replaceWith($compile($scope.getTemplate())($scope));

            }]

        }
    }];

    return termFieldDirective;

});
