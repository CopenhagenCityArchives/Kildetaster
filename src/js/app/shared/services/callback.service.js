var callbackService = ['$location', 'CALLBACK_URL', function($location, CALLBACK_URL) {
    return {
        getCallbackUrl(useCallbackPage) {
            var url = $location.absUrl();
            
            if (useCallbackPage) {
                if (url.indexOf('?') != -1) {
                    url = url.replace('?', '?AUTH_PARAMS&')
                } else {
                    url = url + "?AUTH_PARAMS";
                }
                
                CALLBACK_URL + "?url=" + encodeURIComponent(url);
            } else {
                return url;
            }

            return CALLBACK_URL + '?url=' + encodeURIComponent(url);
        }
    }
}]

export default callbackService;