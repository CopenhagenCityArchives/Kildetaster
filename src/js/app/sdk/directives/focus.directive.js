define(['jquery'], function ($) {
    return function() {
        return {
            restrict: 'A',

            link(scope, element, attr) {
                $(element).focus();
            }
        }
    }
});