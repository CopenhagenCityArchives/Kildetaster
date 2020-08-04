import createAuth0Client from '@auth0/auth0-spa-js';

var tokenService = ['$q', '$sessionStorage', '$location', 'callbackService', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', function tokenService($q, $sessionStorage, $location, callbackService, AUTH0_CLIENTID, AUTH0_DOMAIN) {

    return {
        login() {
            return createAuth0Client({
                client_id: AUTH0_CLIENTID,
                domain: AUTH0_DOMAIN,
                redirect_uri: callbackService.getCallbackUrl()
            })
            .then(function(auth0) {
                return auth0.loginWithPopup();
            })
        },

        getUser() { 
            return createAuth0Client({
                client_id: AUTH0_CLIENTID,
                domain: AUTH0_DOMAIN,
                redirect_uri: callbackService.getCallbackUrl()
            })
            .then(function(auth0) {
                return auth0.getUser();
            })
            .then(function(user) {
                if (user === undefined) {
                    return $q.reject("Not logged in");
                }

                return $q.resolve(user);
            })
        },

        /**
         * Check if the user is logged in, and return the access token if they are
         */
        getToken: function(allowEmptyResponse) {
            var deferred = $q.defer();
            allowEmptyResponse = allowEmptyResponse || false;

            this.getStoredToken()
            .then(function(tokenData) {
                deferred.resolve(tokenData);
            })
            .catch(function() {
                if (allowEmptyResponse) {
                    deferred.resolve({ user: null });
                } else {
                    // TODO: This should ensures that two parallel
                    // authorizations do not interfere. Find a better solution.
                    if (!$location.search().auth_access_token) {
                        auth0.loginWithRedirect({
                            audience: 'https://www.kbhkilder.dk/api',
                            response_type: 'token',
                            redirect_uri: callbackService.getCallbackUrl()
                        });
                    }
                }
            })

            return deferred.promise;
        },

        getStoredToken: function() {
            var deferred = $q.defer();

            if ($sessionStorage.tokenData) {
                deferred.resolve($sessionStorage.tokenData);
            } else {
                deferred.reject('No token data stored.');
            }

            return deferred.promise;
        },

        getUrlToken: function() {
            var deferred = $q.defer();
            var search = $location.search();

            var hash = Object.keys(search)
            .filter(function(key) { 
                return key.startsWith('auth_');
            })
            .map(function(key) {
                return key.replace(/^auth_/, '') + "=" + encodeURIComponent(search[key]);
            })
            .join('&');

            console.log(hash, search);

            angularAuth0.parseHash({ hash: hash }, function(err, authResult) {
                if (err || !authResult) {
                    console.log('Could not parse hash: ',err, hash);                        
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
                        access_token: authResult.accessToken
                    };

                    $sessionStorage.tokenData = tokenData;

                    // clean authorization search parameters
                    Object.keys(search).forEach(function(key) {
                        if (key.startsWith('auth_')) {
                            $location.search(key, null);
                        }
                    })

                    deferred.resolve(tokenData)
                });
            });

            return deferred.promise;
        }
    };

}];

export default tokenService;