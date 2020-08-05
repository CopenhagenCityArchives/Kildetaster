const { $q } = require("angular-ui-router");

define([

], function () {

    //Create a http interceptor factory
    var accessTokenHttpInterceptor = ['$q', 'API_URL', 'authService', function accessTokenHttpInterceptor($q, API_URL, authService) {

        return {

            //For each request the interceptor will set the bearer token header.
            request: function ($config) {
                if ($config.url.startsWith(API_URL)) {
                    return authService.getToken()
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
