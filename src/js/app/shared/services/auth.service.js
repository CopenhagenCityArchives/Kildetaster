import { Auth0Client } from '@auth0/auth0-spa-js';

var authService = ['$q', '$location', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', 'AUTH0_AUDIENCE', function authService($q, $location, AUTH0_CLIENTID, AUTH0_DOMAIN, AUTH0_AUDIENCE) {

    const auth0 = new Auth0Client({
        client_id: AUTH0_CLIENTID,
        domain: AUTH0_DOMAIN,
        audience: AUTH0_AUDIENCE,
        scope: 'openid email profile'
    });

    return {
        getUser(allowEmpty, auth0RedirectUri) {
            if (!auth0RedirectUri) {
                auth0RedirectUri = $location.protocol() + '://' + $location.host()
                if ($location.port() != 443 && $location.port() != 80) {
                    auth0RedirectUri += ':' + $location.port();
                }
            }

            return auth0.handleRedirectCallback()
            .then(function() {
                return auth0.getUser();
            })
            .catch(function() {
                return auth0.getTokenSilently({
                    redirect_uri: auth0RedirectUri
                })
                .then(function() {
                    return auth0.getUser()
                });
            })
            .catch(function() {
                if (allowEmpty) {
                    return $q.resolve(null);
                }
                
                auth0.loginWithRedirect({
                    redirect_uri: auth0RedirectUri
                });

                return $q.resolve({});
            })
            .then(function(user) {
                if (user && user['https://kbharkiv.dk/claims/apacs_user_id']) {
                    user.apacs_user_id = user['https://kbharkiv.dk/claims/apacs_user_id'];
                    return $q.resolve(user);
                } else if (allowEmpty) {
                    return $q.resolve(null);
                } else {
                     $q.reject();
                }
            });
        },

        getToken() {
            var redirectUri = $location.protocol() + '://' + $location.host()
            if ($location.port() != 443 && $location.port() != 80) {
                redirectUri += ':' + $location.port();
            }

            return auth0.getTokenSilently({
                redirect_uri: redirectUri
            });
        }
    };

}];

export default authService;