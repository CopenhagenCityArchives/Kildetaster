define([


], function() {

    var stepService = /*@ngInject*/ function stepService(Flash, $timeout, $q, $http, JSONURL, $filter) {

        var useReal = true;

        return {

            getData: function getData() {

                var resultStep = {
                    "title": "Udfyldt"
                };

                var jsonSource = useReal ? 'http://kbhkilder.dk/1508/stable/api/taskschema/' : JSONURL + '/steps_kbh2.json';
                
                return $http({
                    url: jsonSource,
                    params: {   
                        task_id: 1
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

    };

    return stepService;

});