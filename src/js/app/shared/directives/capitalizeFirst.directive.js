define([

], function() {

    var capitalizeFirstDirective = ['$parse', function($parse) {

        return {
            require: 'ngModel',

            link: function(scope, element, attrs, modelCtrl) {

                var capitalize = function(inputValue) {

                    if (inputValue === undefined) {
                        inputValue = '';
                    }

                    if (typeof(inputValue) !== 'string') {
                        return;
                    }

                    //When used together with typeahead, the value is an object
                    if (typeof(inputValue) == "object") {
                        inputValue = inputValue.name;
                    }
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
                    
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };

                //Do not try to capitalize a number field
                if(attrs.type !== 'number') {
                    modelCtrl.$parsers.push(capitalize);
                    capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
                }

                
                
            }
        };
    }];

    capitalizeFirstDirective.$injet = ['$parse'];

    return capitalizeFirstDirective;

});
