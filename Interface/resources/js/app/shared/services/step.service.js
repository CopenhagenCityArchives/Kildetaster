define([


], function() {

    var stepService = /*@ngInject*/ function stepService($timeout, $q, $http, JSONURL) {

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
                        throw new Error('stepService:getData: ' + err);
                    });
            }

        };

    };

    return stepService;

});