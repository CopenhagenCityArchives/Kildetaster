define([

], function() {

    var sdkRun = ['$state', 'Analytics', '$transitions', function sdkRun($state, Analytics, $transitions) {

        //Track all changes in state in order to track event with Google Analytics
        $transitions.onStart({}, function(trans) {
            trans.promise.finally(function() {

                //dont track entry on search.page as this is done with the Joomla GA
                if (trans.from().name == '' && trans.to().name == 'search.page') {
                    return;
                }

                //avoid double tracking when entering search results from main search page
                if (trans.from().name == 'search.page.results' && trans.to().name == 'search.page.results') {
                    return;
                }

                //avoid double tracking when entering search page from another web page or Joomla
                if (trans.from().name == '' && trans.to().name == 'search.page.results') {
                    return;
                }

                console.log('page view, transition success ' + trans.to().name);
                console.log('from' + trans.from().name);


                Analytics.trackPage(trans.to().name);

            });
        });


        // Enable this to get debug info about transitions in the console
        // https://ui-router.github.io/ng1/docs/1.0.0/enums/trace.category.html
        //$trace.enable('TRANSITION');
        // Hack to suppress new change changes before old finishes
        // @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
        window.myAppErrorLog = [];
        $state.defaultErrorHandler(function(error) {
            // This is a naive example of how to silence the default error handler.
            window.myAppErrorLog.push(error);
        });

    }];

    return sdkRun;

});