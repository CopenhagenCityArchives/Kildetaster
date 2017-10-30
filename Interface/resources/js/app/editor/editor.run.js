define([

], function() {

    var editorRun = /*@ngInject*/ function editorRun($rootScope, $state, $location) {

        //Track in Google Analytics, that we have a changed url
        $rootScope.$on('$locationChangeSuccess', function(event){
            ga('send', 'pageview', {
                'page': window.location.pathname + window.location.hash
            });
        });

        /**
         * Listen for changes to a state with a redirectTo property
         * NOTE: This works because we include a polyfill for ui-router to mimic the old state events,
         * @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
         */
        $rootScope.$on('$stateChangeStart', function(event, toState, params) {



            //The state should redirect, so we append stepId, to force the first step to be the default value
            if (toState.redirectTo) {
                event.preventDefault();
                params.stepId = 1;
                $state.go(toState.redirectTo, params);
            }
        });

        /**
         * If state change, show page not found error
         * NOTE: This works because we include a polyfill for ui-router to mimic the old state events,
         * @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
         */
        $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            console.log("State change error", toState);
            console.log('editor.run:', error);

            //$state.go('editor.page.notfound');

        });

        //Route debugging
        //$rootScope.$on("$stateChangeError", console.log.bind(console));

    };

    return editorRun;

});
