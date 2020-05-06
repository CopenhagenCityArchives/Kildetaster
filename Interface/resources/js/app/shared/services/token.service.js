define([


], function() {

    var tokenService = /*@ngInject*/ function tokenService($q, MAINDOMAIN, BYPASSAUTH, $http, $sessionStorage) {

        return {

            /**
             * Check if the user is logged in, and return the access token if they are
             *
             * @param doNotForceLogin {bool} Indicate if we require the user to be logged in
             *                               Is not required in the sdk part of the solution
             */
            requestToken: function(doNotForceLogin) {

                var deferred = $q.defer();
                var formData = new FormData();

                doNotForceLogin = doNotForceLogin || false;

                if (BYPASSAUTH && BYPASSAUTH === true) {
                    var fakeResponse = {
                        "access_token": "283ce01470f6bc30cf8833a4467cb54655d014c3",
                        "client_id": "kbhkilder",
                        "user_id": "619",
                        "expires": 1474440901,
                        "scope": null,
                        "expireTimeFormatted": "2016-09-21 08:55:01",
                        "profile": {
                            "id": "619",
                            "name": "Sune Radich Vestergaard",
                            "username": "sune-radich",
                            "email": "srv@1508.dk",
                            "registerDate": "2015-12-16 10:02:13",
                            "lastVisitDate": "2016-09-20 06:54:59",
                            "authorisedGroups": ["Registered", "Administrator"]
                        }
                    };

                    $sessionStorage.tokenData = fakeResponse;

                    //HACK TO CIRCUMVENT AUTH
                    deferred.resolve({
                        tokenData: fakeResponse
                    });
                    return deferred.promise;
                }

                if(doNotForceLogin && $sessionStorage.tokenData){
                    deferred.resolve({
                        tokenData: $sessionStorage.tokenData
                    });
                    return deferred.promise;
                }

                formData.append('authorized', 1);
                formData.append('state', 'kildetaster');

                //Should be able to send as json and object, see mail from Bo
                $http({
                        method: 'GET',

                        url: 'https://kbharkiv.eu.auth0.com/authorize',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        transformRequest: angular.identity,
                        params: {
                            audience: "kbharkiv.dk",
                            response_type: "token",
                            client_id: "uNrqzxblFnPrzQWpqMMBiB8h0VppBesM",
                            state: "STATE"
                        }
                    })
                    .then(function(response) {

                        //We got data back from the request, we are logged in and can save to sessionStorage
                        if (typeof response.data === 'object') {
                            //console.log('tokenData', response.data);
                            $sessionStorage.tokenData = response.data;

                            deferred.resolve({
                                tokenData: response.data
                            });
                        }

                        else {
                            //We are not logged in, and should force login, point users to min-side
                            if (!doNotForceLogin) {
                                window.location.href = MAINDOMAIN + '/min-side';
                            }
                            else {
                                deferred.resolve(undefined);
                            }

                        }

                    })
                    .catch(function(err) {
                        console.log('err', err);
                    });

                return deferred.promise;

            },

            getToken: function() {

                if ($sessionStorage.tokenData) {
                    return $sessionStorage.tokenData.access_token;
                }

                return null;
            },

            getTokenData: function() {

                if ($sessionStorage.tokenData) {
                    return $sessionStorage.tokenData;
                }
                return null;
            }

        };

    };

    return tokenService;

});
