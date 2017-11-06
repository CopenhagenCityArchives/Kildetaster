define([

], function() {

    var searchRun =  /*@ngInject*/ function searchRun(SDKCSSURL, $trace) {

        // https://ui-router.github.io/ng1/docs/1.0.0/enums/trace.category.html
        $trace.enable('TRANSITION');

         //Load the css file for the SDK
        var fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.type = "text/css";
        fileref.href = SDKCSSURL;
        document.getElementsByTagName("head")[0].appendChild(fileref);

    };

    return searchRun;
});