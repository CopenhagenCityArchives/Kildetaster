define([

], function() {

    /**
     * Prepare input value for use with solr searches regarding dates.
     * Will convert the date in the format of DD-MM-YYYY to standard utc
     */
    var formatDateDirective = ['$parse', function($parse) {

        return {

            restrict: 'A',

            require: 'ngModel',

            scope: {
            },

            link: function(scope, element, attrs, ngModel) {

                var dateFormat = 'DD-MM-YYYY';

                ngModel.$parsers.push(function(val) {
                    //Convert string in format DD-MM-YYYY to utc iso timestamp
                    return new moment.utc(val, dateFormat).toISOString();
                });

                ngModel.$formatters.push(function(val) {
                    //convert timestamp, and convert to string in the format of DD-MM-YYYY
                    return val ? new moment.utc(val).format(dateFormat) : '';
                });

            }

        }
    }];

    return formatDateDirective;

});
