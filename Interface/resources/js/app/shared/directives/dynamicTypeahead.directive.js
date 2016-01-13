define([

    'angular'

], function(ang) {

    var dynamicTypeaheadDirective = /*@ngInject*/ function dynamicTypeaheadDirective($rootScope, $http, Flash) {

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

    return dynamicTypeaheadDirective;

});