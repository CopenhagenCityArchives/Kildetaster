define([


], function() {

    var entryService = ['$http', '$q', '$filter', 'API_URL', 'Flash', function entryService($http, $q, $filter, API_URL, Flash) {

        return {

            getEntry: function(entryId) {

                return $http({
                    url: API_URL + '/entries/' + entryId,
                    method: 'GET'
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting entry data', err);
                });
            },

            /**
            *
            */
            updateEntry: function(entryId, data) {

                var deferred = $q.defer();

                $http({
                    url: API_URL + '/entries/' + entryId,
                    method: 'PUT',
                    data: data,
                    authorizeRequest: true
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                    return response.data;
                })
                .catch(function(err) {
                    deferred.reject(err);
                    return err;
                });

                return deferred.promise;
            }

        };

    }];

    return entryService;

});
