define(['jquery','bootstrap-tooltip'], function ($, bs) {

    return function() {
        return {
            restrict: 'A',

            link(scope, element, attr) {
                $(element).tooltip();
            }
        }
    }

});