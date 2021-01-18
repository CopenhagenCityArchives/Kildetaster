define([


], function() {

    var stepService = ['Flash', '$timeout', '$q', '$http', 'API_URL', '$filter', function stepService(Flash, $timeout, $q, $http, API_URL, $filter) {

        return {

            getData: function getData(taskId) {

                var resultStep = {
                    "title": "Udfyldt"
                };

                var jsonSource = API_URL + '/taskschema/';

                return $http({
                    url: jsonSource,
                    params: {
                        task_id: taskId
                    }
                })

                .then(function(response) {

                    response.data.steps.push(resultStep);

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
