define([


], function () {

    var config = /*@ngInject*/ function config(AnalyticsProvider) {
        // Analytics config
        AnalyticsProvider.setAccount('UA-45125468-1'); //UU-XXXXXXX-X should be your tracking code
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.startOffline(true);
    };

    var run = /*@ngInject*/ function run($window, Analytics){
        if (!$window.Cookiebot) {
            console.log("Cookiebot not loaded. Ignoring.");
        }
        if ($window.Cookiebot && $window.Cookiebot.consent.statistics) {
            Analytics.registerScriptTags();
            Analytics.registerTrackers();
            Analytics.offline(false);
        } else {
            $window.addEventListener('CookiebotOnAccept', function(e) {
                if ($window.Cookiebot.consent.statistics) {
                    Analytics.registerScriptTags();
                    Analytics.registerTrackers();
                    Analytics.offline(false);
                }
            }, false);
            $window.addEventListener('CookiebotOnDecline', function(e) {
                if ($window.Cookiebot.consent.statistics) {
                    Analytics.registerScriptTags();
                    Analytics.registerTrackers();
                    Analytics.offline(false);
                }
            }, false);
        }
    }

    return {
        'config': config,
        'run': run
    };

});