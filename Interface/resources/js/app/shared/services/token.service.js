
define([


], function() {

    var tokenService = /*@ngInject*/ function tokenService($q, angularAuth0, $sessionStorage, $location) {

        return {

            /**
             * If returned from Auth0 with token, save token and return user data
             */
            getTokenFromCallBack: function(){
                var deferred = $q.defer();
                var that = this;

                angularAuth0.parseHash({ hash: window.location.hash },function(err, authResult) {
                    if (err) {
                        console.log('Could not parse hash: ',err);                        
                        deferred.reject({error:"could not parse token from Auth0."});
                        return;
                    }
                    if(window.location.hash == ""){
                        console.log("Error: No hash given, redirecting to login");
                        that.requestToken();
                        return;
                    }

                    
                  
                    angularAuth0.client.userInfo(authResult.accessToken, function(err, user) {
                        if(err){
                            console.log('Error: Could not get user info from Auth0: ',err);
                            deferred.reject();
                            return;
                        }
                        //TODO: Hardcoded user id
                        user.userId = 1;

                        tokenData =  {
                            user: user,
                            access_token: authResult.accessToken,
                            url: decodeURI($location.search().url)
                        };

                        $sessionStorage.tokenData = tokenData
                        
                        deferred.resolve(tokenData)
                    });
                });

                return deferred.promise;
            },

            /**
             * Check if the user is logged in, and return the access token if they are
             */
            requestToken: function() {
                var url = '';
                if($location.url().indexOf('/login') == -1){
                    url = encodeURI($location.url());
                }


                angularAuth0.authorize({
                    audience: 'https://www.kbhkilder.dk/api',
                    responseType: 'token',
                    redirectUri: $location.absUrl() + '/login?url=' + url 
                });
                return; 
            },

            getUserData: function(allowEmptyResponse){
                allowEmptyResponse = allowEmptyResponse || false;

                var deferred = $q.defer();
                if($sessionStorage.tokenData){
                    deferred.resolve($sessionStorage.tokenData.user);
                }
                else{
                    if(allowEmptyResponse){
                        deferred.resolve({});
                    }

                    else{
                        deferred.reject();
                        this.requestToken();
                    }
                }

                return deferred.promise;
            }
        };

    };

    return tokenService;

});
