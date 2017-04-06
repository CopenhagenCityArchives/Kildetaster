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

                // Watch property to the temp date value, and convert it to the correct
                //format for solr to process
                $scope.$watch('data.tmpDate', function(newval, oldval) {

                    if (newval && newval !== oldval) {
                        $scope.data.term = new moment.utc(newval, 'DD-MM-YYYY').toISOString();
                    }
                });

                $scope.showDatePicker = false;

                $scope.ngModelOptions = {
                    updateOn: 'default'
                };

                /**
                * Keypress event handler, that tests if they pressed key is Enter
                * and if so, submits a search
                */
                $scope.selectDate = function selectDate($event) {

                    if ($event.keyCode === 13) {
                        $scope.showDatePicker = false;
                        $scope.submitFunc({ event: $event });
                    }

                }

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
