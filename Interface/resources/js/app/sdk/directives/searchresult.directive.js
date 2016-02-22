define([
], function() {

    var searchDirective = /*@ngInject*/ function(API) {

        return {
            
            restrict: 'E',
            replace: true,

            scope: {
                result: '=',
                config: '='
            },

            templateUrl: 'sdk/directives/searchresult.directive.tpl.html',

            link: function(scope, element, attr) {
               
                scope.lookItUp = function(str) {

                    var found = scope.config.find(function(itm) {
                       //Return the item that matches the solr_name and is marked as include in result
                       return str === itm.solr_name && itm.include_in_result === '1';
                    });

                    if (found !== undefined) {
                        return found.name;    
                    }
                    else {
                        return null;
                    }
                    
                };

                scope.buildValue = function(val) {
                    if (angular.isArray(val)) {
                        return val.join(', ');
                    }
                    else {
                        return val;
                    }
                };

                /**
                * Build the url for the image, based on post_id
                */
                scope.getImage = function getImage(resultData) {
                    return API + '/api/posts/' + resultData.post_id + '/image';
                };

                scope.$on('$destroy', function() {
                    console.log('destroyed');
                });

            }
        };

    };

    return searchDirective;

});