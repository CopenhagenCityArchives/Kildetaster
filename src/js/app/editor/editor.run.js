export default ['$state', '$transitions', 'Analytics', function editorRun($state, $transitions, Analytics) {

    $transitions.onStart({ }, function(trans) {
        //Track all changes in state in order to track event with Google Analytics
        Analytics.trackPage(trans.to().name);

        //The state should redirect, so we append stepId, to force the first step to be the default value
        if (trans.params().redirectTo) {
            event.preventDefault();
            params.stepId = 1;
            $state.go(trans.params().redirectTo, params);
        }        
    });

    /**
     * If state change, show page not found error
     * NOTE: This works because we include a polyfill for ui-router to mimic the old state events,
     * @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
     */
    $transitions.onError({}, function(transition) {
        console.log('editor.run:', transition.error());
    });
}];
