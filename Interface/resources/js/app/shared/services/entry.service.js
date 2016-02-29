define([


], function() {

    var entryService = /*@ngInject*/ function entryService($http, $q, $filter, API, Flash) {

        return {

            getEntry: function(entryId) {
                
                return $http({
                    url: API + '/entries/' + entryId,
                    method: 'GET'
                })
                .then(function(response) {
                    console.log('entry', response.data);
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting entry data', err);
                });
            },

            updateEntry: function(entryId, data) {

                var deferred = $q.defer();

                $http({
                    url: API + '/entries/' + entryId,
                    method: 'PATCH',
                    data: data
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

    };

    return entryService;

});