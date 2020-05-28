define([

], function() {

    /**
     * Prepare input value for use with solr searches.
     * Will replaces spaces with *
     * And escape select special chars
     */
    var formatInputDirective = /* @ngInject */ function($parse) {

        return {

            restrict: 'A',

            require: 'ngModel',

            scope: {
                //Should we run the logic at all
                shouldEscape: '='
            },

            link: function(scope, element, attrs, ngModel) {

                scope.$watch('shouldEscape', function(newval, oldval) {

                    if (newval) {
                        //Force running parsers
                        //@see https://stackoverflow.com/questions/16284878/how-to-trigger-angular-parsers-without-inputing-anything-in-the-field
                        angular.forEach(ngModel.$parsers, function (parser) {
                            parser(ngModel.$viewValue);
                        });
                    }

                });

                ngModel.$parsers.push(function(val) {

                    if (scope.shouldEscape) {
                        //Handle spaces and convert to * for solr search
                        return val.replace(' ', '*');
                    }
                    else {
                        return val;
                    }

                });

                ngModel.$formatters.push(function(val) {

                    if (scope.shouldEscape) {

                        if (val) {
                            //Handle solr values and prepare to show for the user, converting * to spaces
                            return val.replace('*', ' ');
                        }
                        else return '';

                    }
                    else {
                        return val;
                    }

                });

            }

        }
    };

    return formatInputDirective;

});
