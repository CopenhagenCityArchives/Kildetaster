var callbackService = ['$location', 'CALLBACK_URL', function($location, CALLBACK_URL) {
    return {
        getCallbackUrl() {
            var url = $location.absUrl();
            return url;

            if (url.indexOf('?') != -1) {
                url = url.replace('?', '?AUTH_PARAMS&')
            } else {
                url = url + "?AUTH_PARAMS";
            }

            return CALLBACK_URL + '?url=' + encodeURIComponent(url);
        }
    }
}]

export default callbackService;