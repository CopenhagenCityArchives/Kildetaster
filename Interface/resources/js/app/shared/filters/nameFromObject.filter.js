define([

], function() {

    var nameFromObjectFilter = function() {
        
        /**
        * If the given parameter is an object, return its name proptery,
        * otherwise just return the given object
        */
        return function nameFromObject(obj) {
            if (angular.isObject(obj)) {
                return obj.name;    
            }
            else {
                return obj;
            }
            
        };
    };

    return nameFromObjectFilter;
});