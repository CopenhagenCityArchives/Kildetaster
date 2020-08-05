import { Auth0Client } from '@auth0/auth0-spa-js';

var authService = ['$q', 'callbackService', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', function authService($q, callbackService, AUTH0_CLIENTID, AUTH0_DOMAIN) {

    const auth0 = new Auth0Client({
        client_id: AUTH0_CLIENTID,
        domain: AUTH0_DOMAIN,
        redirect_uri: callbackService.getCallbackUrl()
    });

    return {
        getUser(allowEmpty) {
            var r = Math.floor(Math.random() * 100);

            console.log(r, "1. handleRedirectCallback");
            return auth0.handleRedirectCallback()
            .then(function() {
                console.log(r, '2a. getUser')
                return auth0.getUser();
            })
            .catch(function(err) {
                console.log(r, '2b. getTokenSilently (from error)', err)
                return auth0.getTokenSilently()
                .then(function() {
                    console.log("3a. getUser")
                    return auth0.getUser();
                });
            })
            .catch(function(err) {
                if (allowEmpty) {
                    return $q.resolve({});
                }
                
                console.log(r, "3b. loginWithRedirect ()", err)
                auth0.loginWithRedirect({
                    redirect_uri: callbackService.getCallbackUrl()
                });

                return $q.resolve({});
            })
        },

        getToken() {
            return auth0.getTokenSilently();
        }
    };

}];

export default authService;