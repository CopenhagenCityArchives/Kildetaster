/**
 * Main AngularJS Web Application
 */
var app = angular.module('APACSDatasourceEditor', [
    'ngSanitize',
    'schemaForm',
    'ngRoute',
    'ui.select',
    'ngStorage',
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // Home
        //  .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
        // Pages*/
        .when("/", {
            templateUrl: "partials/main.html",
            controller: "EditorController"
        })
        /*
           .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
           .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
           .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
           .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
           .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
           // Blog
           .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
           .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
           // else 404*/
        .otherwise("/404", {
            templateUrl: "partials/404.html",
            controller: "PageCtrl"
        });
}]);

app.factory('httpRequestInterceptor', ['$sessionStorage', function($sessionStorage) {
    return {
        request: function($config) {
            if ($config.method == 'GET') {
                return $config;
            }
            if ($sessionStorage.tokenData) {
                //Fetch token from cookie
                var token = $sessionStorage.tokenData.access_token;

                //set authorization header
                $config.headers['Authorization'] = 'Bearer ' + token;
                console.log('got token!');
            } else {
                console.log('could not get token');
            }
            return $config;
        }
    };
}]);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.constant('API', 'http://localhost:8000/datasource');

//Loading and saving files
app.service('Datasource', ['$http', '$q', 'API', function($http, $q, API) {
    var pubs = {};

    pubs.getValuesByQuery = function(datasourceId, query) {
        var deferred = $q.defer();

        $http.get(API + "/" + datasourceId + "?q=" + query).then(
            function(data, status, headers) {
                deferred.resolve(data);
            },
            function(data, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };

    pubs.create = function(datasourceId, value) {
        var deferred = $q.defer();
        $http.post(API + "/" + datasourceId, {
            value: value
        }).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                console.log(resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };

    pubs.update = function(datasourceId, valueId, value) {
        var deferred = $q.defer();
        $http.patch(API + "/" + datasourceId, {
            id: valueId,
            value: value
        }).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                console.log(resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };

    pubs.getList = function() {
        var deferred = $q.defer();
        $http.get(API).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                console.log(resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };

    return pubs;
}]);

app.controller('EditorController', ['$scope', '$location', '$sessionStorage', 'Datasource', function(scope, $location, $sessionStorage, Datasource) {
    scope.model = {};
    scope.model.selected_datasource = null;
    scope.model.datasources = [];
    scope.model.changeValue = "";
    scope.model.newValue = "";
    scope.model.selectedValue = {};
    scope.model.values = [];
    scope.model.canUpdateValue = false;
    scope.model.canCreateValue = false;

    scope.model.status = "";

    scope.model.loginStatus = false;

    scope.model.history = [];

    scope.$watch(function() {
            return scope.model.selectedValue;
        },
        function(changeValue) {
            if (scope.model.selected_datasource) {
                scope.model.changeValue = changeValue[scope.model.selected_datasource.valueField];
            }
        }
    );

    scope.$watch(function() {
        return scope.model.changeValue;
    }, function(changeValue) {
        scope.model.canUpdateValue = scope.model.changeValue && scope.model.changeValue !== scope.model.selectedValue[scope.model.selected_datasource.valueField];
        scope.model.newValue = undefined;
        if (changeValue) {
            scope.model.status = "";
        }
    });

    scope.$watch(function() {
        return scope.model.newValue;
    }, function(newValue) {
        scope.model.canCreateValue = scope.model.newValue;
        scope.model.changeValue = undefined;
        if (newValue) {
            scope.model.status = "";
        }
    });

    scope.save = function() {
        if (scope.model.selectedValue.id) {
            Datasource.update(scope.model.selected_datasource.id, scope.model.selectedValue.id, scope.model.changeValue).then(function(resdata) {
                scope.model.history.push({
                    type: "update",
                    oldValue: scope.model.selectedValue[scope.model.selected_datasource.valueField],
                    newValue: scope.model.changeValue
                });
                scope.reset();
                scope.model.status = "Ændringerne blev gemt";
            });
        } else {
            Datasource.create(scope.model.selected_datasource.id, scope.model.newValue).then(function() {
                scope.model.history.push({
                    type: "create",
                    oldValue: "",
                    newValue: scope.model.newValue
                });
                scope.reset();
                scope.model.status = "Ændringerne blev gemt";
            });
        }
    };

    scope.reset = function() {
        scope.model.changeValue = undefined;
        scope.model.newValue = undefined;
        scope.model.selectedValue = {};
        scope.model.canUpdateValue = false;
        scope.model.canCreateValue = false;
        scope.model.values = [];
    };

    scope.getValuesByQuery = function(value) {
        if (!scope.model.selected_datasource || value == "") {
            return;
        }

        Datasource.getValuesByQuery(scope.model.selected_datasource.id, value).then(function(data) {
            scope.model.values = data.data;
            return data.data;
        });
    };

    scope.init = function() {
        scope.model.loginStatus = $sessionStorage.tokenData !== undefined;
        scope.model.status = 'Henter lister';
        Datasource.getList().then(function(data) {
            scope.model.datasources = data.data;
            scope.model.selected_datasource = null;
            scope.model.history = [];
            console.log(data);
            scope.model.status = "";
        });
        console.log();
    };

    scope.init();
}]);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter
 */
app.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
