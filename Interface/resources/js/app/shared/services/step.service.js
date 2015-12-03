define([


], function() {

    var stepService = function($timeout, $q, $http) {

        var basePath = '/resources/mock';

        return {

            getData: function getData() {

                var firstStep = {
                    "title": "Vælg udsnit",
                    "description": "Lorem ipsum dolor sit amet, consectetur."
                };

                var resultStep = {
                    "title": "Udfyldt",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi."
                };
                
                return $http.get(basePath + '/steps.json')
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

                }, 500);

                return deferred.promise;

            }


        };

    };

    return stepService;

});