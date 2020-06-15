define([

], function () {

    //Create a http interceptor factory
    var accessTokenHttpInterceptor = ['MAIN_DOMAIN', 'SOLR_API_URL', '$sessionStorage', function accessTokenHttpInterceptor(MAIN_DOMAIN, SOLR_API_URL, $sessionStorage) {

        return {

            //For each request the interceptor will set the bearer token header.
            request: function ($config) {


                if ($config.url !== MAIN_DOMAIN + '/index.php' && $config.url.indexOf(SOLR_API_URL) == -1) {

                    if ($sessionStorage.tokenData) {
                        //Fetch token from cookie
                        var token = $sessionStorage.tokenData.access_token;

                        //set authorization header
                        $config.headers['Authorization'] = 'Bearer ' + token;
                    }

                } else {
                    console.log("request sent to MAINURL or Solr, skipping authorization header");
                }

                return $config;

            },

            response: function (response) {
                //if you get a token back in your response you can use
                //the response interceptor to update the token in the
                //stored in the cookie

                // if (response.config.headers.yourTokenProperty) {
                //       //fetch token
                //       var token = response.config.headers.yourTokenProperty;

                //       //set token
                //       $cookies.put('token', token);
                // }

                return response;
            }
        };
    }];

    return accessTokenHttpInterceptor;

});
