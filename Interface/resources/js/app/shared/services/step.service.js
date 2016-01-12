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
                
                return $http.get(JSONURL + '/steps.json')
                    .then(function(response) {
                        response.data.unshift(firstStep);
                        response.data.push(resultStep);
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