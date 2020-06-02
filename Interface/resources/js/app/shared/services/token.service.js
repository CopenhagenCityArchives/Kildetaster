
define([


], function() {

    var tokenService = /*@ngInject*/ function tokenService($q, MAINDOMAIN, BYPASSAUTH, angularAuth0, $http, $sessionStorage, $state, $location) {

        return {
            /**
             * If returned from Auth0 with token, save token and return user data
             */
            getTokenFromCallBack: function(){
                var deferred = $q.defer();

                angularAuth0.parseHash({ hash: window.location.hash },function(err, authResult) {
                    if (err) {
                        console.log(err);                        
                        deferred.reject({error:"could not parse token from Auth0."});
                        return;
                    }

                    
                  
                    angularAuth0.client.userInfo(authResult.accessToken, function(err, user) {
                        if(err){
                            console.log(err);
                            deferred.reject({error: "could not get userInfo based on accessToken."});
                            return;
                        }
                        
                        tokenData =  {
                            user: user,
                            access_token: authResult.accessToken,
                            url: decodeURI($location.search().url)
                        };

                        console.log($state);

                        $sessionStorage.tokenData = tokenData
                        
                        deferred.resolve(tokenData)
                    });
                });

                return deferred.promise;
            },
            /**
             * Check if the user is logged in, and return the access token if they are
             *
             * @param doNotForceLogin {bool} Indicate if we require the user to be logged in
             *                               Is not required in the sdk part of the solution
             */
            requestToken: function(doNotForceLogin) {
                var deferred = $q.defer();
                doNotForceLogin = doNotForceLogin || false;
                
                if($sessionStorage.tokenData){
                    deferred.resolve({
                        tokenData: $sessionStorage.tokenData
                    });
                    return deferred.promise;
                }

                angularAuth0.authorize({
                    audience: 'https://www.kbhkilder.dk/api',
                    responseType: 'token',
                    redirectUri: $location.protocol() + '://' + $location.host() + ":" + $location.port() + '/login?url=' + encodeURI($location.url())
                });
                return; 
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
