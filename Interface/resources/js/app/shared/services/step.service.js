define([


], function() {

    var stepService = /*@ngInject*/ function stepService(Flash, $timeout, $q, $http, JSONURL, $filter) {

        return {

            getData: function getData() {

                var firstStep = {
                    "title": "Vælg udsnit"
                };

                var resultStep = {
                    "title": "Udfyldt"
                };
                
                return $http.get(JSONURL + '/steps_kbh.json')
                    .then(function(response) {

                        response.data.steps.unshift(firstStep);
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