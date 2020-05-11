define([


], function() {

    var unitService = /*@ngInject*/ function unitService($http, $q, API_ENDPOINT) {

        return {

            getUnit: function getUnit(unitId, params) {
                
                //taskid
                //unitid
                //postid

                //unit/ get metadata
   
                return $http({
                    url: API_ENDPOINT + '/units/' + unitId,
                    method: 'GET',
                    params: params
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    throw new Error('errorService:getData: ' + err);
                });
            }

        };

    };

    return unitService;

});