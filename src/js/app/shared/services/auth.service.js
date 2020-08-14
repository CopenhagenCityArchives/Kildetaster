import { Auth0Client } from '@auth0/auth0-spa-js';

var authService = ['$q', 'callbackService', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', 'AUTH0_AUDIENCE', function authService($q, callbackService, AUTH0_CLIENTID, AUTH0_DOMAIN, AUTH0_AUDIENCE) {

    const auth0 = new Auth0Client({
        client_id: AUTH0_CLIENTID,
        domain: AUTH0_DOMAIN,
        audience: AUTH0_AUDIENCE,
        redirect_uri: callbackService.getCallbackUrl(),
        scope: 'openid email profile'
    });

    return {
        getUser(allowEmpty) {
            return auth0.handleRedirectCallback()
            .then(function() {
                return auth0.getUser();
            })
            .catch(function(err) {
                return auth0.getTokenSilently()
                .then(function() {
                    return auth0.getUser()
                });
            })
            .catch(function() {
                if (allowEmpty) {
                    return $q.resolve({});
                }
                
                auth0.loginWithRedirect({
                    redirect_uri: callbackService.getCallbackUrl()
                });

                return $q.resolve({});
            })
            .then(function(user) {
                user.apacs_user_id = user['https://kbharkiv.dk/claims/apacs_user_id'];
                return $q.resolve(user);
            });
        },

        getToken() {
            return auth0.getTokenSilently();
        }
    };

}];

export default authService;