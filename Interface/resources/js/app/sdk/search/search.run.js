define([

], function() {

    var searchRun =  /*@ngInject*/ function searchRun(SDKCSSURL) {

         //Load the css file for the SDK
        var fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.type = "text/css";
        fileref.href = SDKCSSURL;
        document.getElementsByTagName("head")[0].appendChild(fileref);

    };

    return searchRun;
});