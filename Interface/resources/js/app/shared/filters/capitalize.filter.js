define([],

function() {

    var capitalizeFilter = function capitalizeFilter() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    };

    return capitalizeFilter;
});
