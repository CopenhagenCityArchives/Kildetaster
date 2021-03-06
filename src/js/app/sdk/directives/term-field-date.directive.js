define([

], function() {

    var termFieldDirective = function() {
        return {

            restrict: 'E',

            scope: {
                data: '=',
                type: '=',
                submitFunc: '&'
            },

            template: require('./term-field.directive--date.tpl.html'),

            controller: ['$scope', function($scope) {

                //Initial state of the datepicker
                $scope.showDatePicker = false;

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

                if ($scope.data.term) {
                    //Convert the saved timesamp to a value the datepicker understands
                    $scope.data.tmpDate = new moment($scope.data.term).format('DD-MM-YYYY');
                }

            }]

        }
    };

    return termFieldDirective;

});
