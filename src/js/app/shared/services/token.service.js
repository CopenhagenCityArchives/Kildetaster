import { Auth0Client } from '@auth0/auth0-spa-js';

var tokenService = ['$q', '$sessionStorage', '$location', 'callbackService', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', function tokenService($q, $sessionStorage, $location, callbackService, AUTH0_CLIENTID, AUTH0_DOMAIN) {

    const auth0 = new Auth0Client({
        client_id: AUTH0_CLIENTID,
        domain: AUTH0_DOMAIN,
        redirect_uri: callbackService.getCallbackUrl()
    });
    
    return {
        login() {
            return auth0.loginWithPopup();
        },

        getUser() { 
            return auth0.getUser()
            .then(function(user) {
                if (user === undefined) {
                    return $q.reject("Not logged in");
                }

                return $q.resolve(user);
            })
        },

        getToken() {
            return auth0.getTokenSilently()
            .catch(function() {
                return auth0.getTokenWithPopup();
            });
        }
    };

}];

export default tokenService;