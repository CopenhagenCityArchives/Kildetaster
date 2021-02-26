define([


], function() {

    var stepService = ['Flash', '$timeout', '$q', '$http', 'API_URL', '$filter', function stepService(Flash, $timeout, $q, $http, API_URL, $filter) {

        return {

            getData: function getData(taskId) {
                var jsonSource = API_URL + '/taskschema/';

                return $http({
                    url: jsonSource,
                    params: {
                        task_id: taskId
                    }
                })
                .then(function(response) {
                    // If any step contains a name property, add the last step with a name
                    response.data.steps.push(response.data.steps.filter(function(step) {
                        return step.name
                    }).length == 0 ? { } : { name: 'Gem' });
                    return response.data;
                })
                .catch(function(err) {
                    Flash.create('danger', 'stepService:getData: Could not get step data');
                    return [];
                });
            }

        };

    }];

    return stepService;

});
