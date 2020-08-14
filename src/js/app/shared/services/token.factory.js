const { $q } = require("angular-ui-router");

define([

], function () {

    //Create a http interceptor factory
    var accessTokenHttpInterceptor = ['$q', 'API_URL', 'authService', function accessTokenHttpInterceptor($q, API_URL, authService) {

        return {

            // If authorization is requested, the bearer token will be set
            request: function ($config) {
                if ($config.authorizeRequest) {
                    return authService.getToken()
                    .then(function(token) {
                        $config.headers['Authorization'] = 'Bearer ' + token;
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
