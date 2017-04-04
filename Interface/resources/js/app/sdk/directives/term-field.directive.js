define([

], function() {

    var termFieldDirective = /* @ngInject */ function($http, $sce, TYPEAHEADMAXIUMUM) {
        return {

            restrict: 'E',

            scope: {
                data: '=',
                type: '='
            },

            template: '<ng-include src="getTemplateUrl()"></ng-include>',

            controller: /* @ngInject */ function($scope) {

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
                        //return [];
                    }

                    if (term.length < 2) {
                        return [];
                    }

                    //Indicate that we are about to load new options
                    $scope.loading = true;

                    if (field.enum && field.enum.length > 0) {
                        console.log('field enum', field.enum);

                        $scope.options = field.enum;
                        $scope.loading = false;
                        return;
                    }
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

                $scope.getTemplateUrl = function getTemplateUrl() {

                    if ($scope.type) {
                        return 'sdk/directives/term-field.directive--' + $scope.type + '.tpl.html';
                    }
                    else {
                        return 'sdk/directives/term-field.directive--string.tpl.html';
                    }

                }
            }

        }
    };

    return termFieldDirective;

});
