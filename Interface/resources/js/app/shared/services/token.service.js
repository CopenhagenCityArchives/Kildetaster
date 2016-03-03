define([


], function() {

    var tokenService = /*@ngInject*/ function tokenService($q, MAINDOMAIN, $http, $sessionStorage) {

        return {

            requestToken: function() {

                var deferred = $q.defer();
                var formData = new FormData();

                formData.append('authorized', 1);
                formData.append('state', 'kildetaster');

                $http({
                        method: 'POST',

                        url: MAINDOMAIN + '/index.php',
                        headers: {
                            'Content-Type': undefined //'application/x-www-form-urlencoded'
                        },
                        transformRequest: angular.identity,
                        // transformRequest: function(obj) {
                        //     var str = [];
                        //     for (var p in obj)
                        //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        //     return str.join("&");
                        // },
                        params: {
                            option: 'authorize',
                            response_type: 'token',
                            client_id: 'kbhkilder',
                            api: 'oauth2'
                        },
                        data: formData
                    })
                    .then(function(response) {

                        //We got data back from the request, we are loggeld in and can save to sessionStorage
                        if (typeof response.data === 'object') {
                            //console.log('tokenData', response.data);
                            $sessionStorage.tokenData = response.data;

                            deferred.resolve({ tokenData: response.data });
                        }
                        //We are not logged in, point users to min-side
                        else {
                            window.location.href = MAINDOMAIN + '/min-side';
                        }

                    })
                    .catch(function(err) {
                        console.log('err', err);
                    });

                return deferred.promise;

            },


            getToken: function() {
                //console.log('data', $sessionStorage.tokenData);
                if ($sessionStorage.tokenData) {
                    return $sessionStorage.tokenData.access_token;
                }

                return null;
            }



        };

    };

    return tokenService;

});
