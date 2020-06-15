
define([

], function() {

    var tokenService = ['$q', 'angularAuth0', '$sessionStorage', '$location', function tokenService($q, angularAuth0, $sessionStorage, $location) {

        return {

            /**
             * Check if the user is logged in, and return the access token if they are
             */
            getToken: function() {
                var deferred = $q.defer();

                var hashIndex = $location.absUrl().indexOf('access_token');
                var hash = "";
                if (hashIndex != -1) {
                    hash = $location.absUrl().substring(hashIndex, $location.absUrl().length);
                }

                if ($sessionStorage.tokenData) {
                    deferred.resolve($sessionStorage.tokenData);
                } else if (hash == "") {
                    angularAuth0.authorize({
                        audience: 'https://www.kbhkilder.dk/api',
                        responseType: 'token',
                        redirectUri: $location.absUrl()
                    });
                } else {
                    angularAuth0.parseHash({ hash: hash }, function(err, authResult) {
                        if (err) {
                            console.log('Could not parse hash: ',err);                        
                            deferred.reject(err);
                            return;
                        }
                      
                        angularAuth0.client.userInfo(authResult.accessToken, function(err, user) {
                            if (err) {
                                console.log('Error: Could not get user info from Auth0: ',err);
                                deferred.reject(err);
                                return;
                            }
                            //TODO: Hardcoded user id (Signe's user)
                            user.userId = 601;
    
                            tokenData =  {
                                user: user,
                                access_token: authResult.accessToken,
                                url: decodeURI($location.search().url)
                            };
    
                            $sessionStorage.tokenData = tokenData;
                            deferred.resolve(tokenData)
                        });
                    });
                }

                return deferred.promise;
            },

            getUserData: function(allowEmptyResponse){
                allowEmptyResponse = allowEmptyResponse || false;

                var deferred = $q.defer();

                this.getToken()
                .then(function(tokenData) {
                    deferred.resolve(tokenData.user)
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }
        };

    }];

    return tokenService;

});
