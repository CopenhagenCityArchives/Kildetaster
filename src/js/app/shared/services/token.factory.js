const { $q } = require("angular-ui-router");

define([

], function () {

    //Create a http interceptor factory
    var accessTokenHttpInterceptor = ['$q', 'API_URL', 'tokenService', function accessTokenHttpInterceptor($q, API_URL, tokenService) {

        return {

            //For each request the interceptor will set the bearer token header.
            request: function ($config) {
                if ($config.url.startsWith(API_URL)) {
                    return tokenService.getToken()
                    .then(function(token) {
                        $config.headers['Authorization'] = 'Bearer ' + token;
                        return $q.resolve($config);
                    })
                    .catch(function() {
                        return $q.resolve($config);
                    });
                } else {
                    return $config;
                }
            },

            response: function (response) {
                return response;
            }
        };
    }];

    return accessTokenHttpInterceptor;

});
