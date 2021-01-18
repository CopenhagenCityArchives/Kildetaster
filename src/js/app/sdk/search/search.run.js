define([
    'jquery'
], function($) {

    var searchRun = ['$anchorScroll', function searchRun($anchorScroll) {
        $anchorScroll.yOffset = $('header.top-menu'); // fixed position header element
    }];

    return searchRun;
});