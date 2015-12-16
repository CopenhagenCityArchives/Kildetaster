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
                
                return $http.get(JSONURL + '/steps.json')
                    .then(function(response) {
                        response.data.unshift(firstStep);
                        response.data.push(resultStep);
                        return response.data;
                    })
                    .catch(function(err) {
                        throw new Error('stepService:getData: ' + err);
                    });
            },

            validateStep: function validateStep(data, forceInvalid) {
                
                var deferred = $q.defer();

                $timeout(function() {

                    forceInvalid = forceInvalid || false;
                    
                    deferred.resolve({
                        isValid: !forceInvalid
                    });

                }, 300);

                return deferred.promise;

            }


        };

    };

    return stepService;

});