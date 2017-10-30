define([

], function() {

    var sdkRun = /*@ngInject*/ function sdkRun(SDKCSSURL, $state, $trace) {

        // Enable debugging of state to the console
        // $trace.enable('TRANSITON');

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