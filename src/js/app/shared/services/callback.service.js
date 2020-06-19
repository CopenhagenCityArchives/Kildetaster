var callbackService = ['$location', 'CALLBACK_URL', function($location, CALLBACK_URL) {
    return {
        getCallbackUrl() {
            var path = $location.path();
            var search = $location.search();
            var spaRoot = $location.absUrl().substring(0, $location.absUrl().indexOf(path));

            var url = spaRoot;
            url += '/login?AUTH_PARAMS&path=' + path;
            url += '&' + Object.keys(search).map(function(key) {return key + '=' + search[key]});

            return CALLBACK_URL + '?url=' + encodeURIComponent(url);
        }
    }
}]

export default callbackService;