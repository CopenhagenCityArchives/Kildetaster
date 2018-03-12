define([

], function() {

    var sdkRun = /*@ngInject*/ function sdkRun(SDKCSSURL, $state, $trace) {

        // Enable this to get debug info about transitions in the console
        // https://ui-router.github.io/ng1/docs/1.0.0/enums/trace.category.html
        //$trace.enable('TRANSITION');

        //Load the css file for the SDK
        var fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.type = "text/css";
        fileref.href = SDKCSSURL;
        document.getElementsByTagName("head")[0].appendChild(fileref);

        // Hack to suppress new change changes before old finishes
        // @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
        window.myAppErrorLog = [];
        $state.defaultErrorHandler(function (error) {
            // This is a naive example of how to silence the default error handler.
            window.myAppErrorLog.push(error);
        });

    };

    return sdkRun;

});