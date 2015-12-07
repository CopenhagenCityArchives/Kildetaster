define([

], function() {

    var editorRun = function editorRun($rootScope, $state) {

        /**
         * Listen for changes to a state with a redirectTo property
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
         */
        $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            //console.log('editor.run:', error);
            $state.go('^.notfound');

        });

    };

    return editorRun;
});
