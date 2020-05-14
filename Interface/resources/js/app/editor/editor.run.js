define([

], function() {

    var editorRun = /*@ngInject*/ function editorRun($state, $transitions, $window,Analytics) {

        //Track all changes in state in order to track event with Google Analytics
        $transitions.onStart({ }, function(trans) {

            //The state should redirect, so we append stepId, to force the first step to be the default value
            if (trans.params().redirectTo) {
                event.preventDefault();
                params.stepId = 1;
                $state.go(trans.params().redirectTo, params);
            }             
        });

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

        /**
         * If state change, show page not found error
         * NOTE: This works because we include a polyfill for ui-router to mimic the old state events,
         * @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
         */
        $transitions.onError({}, function(transition) {
            //console.log("State change error", transition.from().name);
            console.log('editor.run:', transition.error());

            //$state.go('editor.page.notfound');
        });

        //Route debugging
        //$rootScope.$on("$stateChangeError", console.log.bind(console));

    };

    return editorRun;

});
