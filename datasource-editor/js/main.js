import angular from 'angular';
import ngRoute from 'angular-route';
import ngStorage from 'ngstorage';
import ngSanitize from 'angular-sanitize';
import uiSelect from 'ui-select';

import { Auth0Client } from '@auth0/auth0-spa-js';

import constants from '../../constants.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ui-select/dist/select.css';


/**
 * Main AngularJS Web Application
 */
var app = angular.module('APACSDatasourceEditor', [
    'constants',
    'ngSanitize',
    'ngRoute',
    'ui.select',
    'ngStorage'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            template: require("../partials/main.tpl.html"),
            controller: "EditorController"
        })

        .otherwise("/404", {
            template: require("../partials/404.tpl.html"),
            controller: "PageCtrl"
        });
}]);

app.factory('httpRequestInterceptor', ['TokenService', function(TokenService) {
    return {
        request: function($config) {
            return TokenService.get()
            .then(function(token) {
                $config.headers['Authorization'] = 'Bearer ' + token;
                return $config;
            });
        }
    };
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);

app.constant('DeleteAPI', 'https://api.kbharkiv.dk/posts');
app.constant('PageAPI', 'https://api.kbharkiv.dk/taskspages');
app.constant('API', 'https://api.kbharkiv.dk/datasource');


app.service('PagesService', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {
    var pubs = {};

    pubs.unlock = function(taskId, pageId) {
        var deferred = $q.defer();

        $http.patch(API_URL + '/taskspages?task_id=' + taskId + '&page_id=' + pageId, {
            'is_done': 0
        }).then(
            function(data, status, headers) {
                deferred.resolve(data);
            },
            function(data, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };

    return pubs;
}]);

//Loading and saving files
app.service('Datasource', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {
    var pubs = {};

    pubs.getValuesByQuery = function(datasourceId, query) {
        var deferred = $q.defer();

        $http.get(API_URL + "/datasource/" + datasourceId + "?q=" + query).then(
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
        $http.post(API_URL + "/datasource/" + datasourceId, {
            value: value
        }).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                //console.log(resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(resdata, status, headers);
            }
        );

        return deferred.promise;
    };

    pubs.update = function(datasourceId, valueId, newValue, oldValue, json) {
        var deferred = $q.defer();
        console.log(json);
        $http.patch(API_URL + "/datasource/" + datasourceId, {
            id: valueId,
            value: newValue,
            oldValue: oldValue,
            backup: json,
        }).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata, status, headers);
            },
            function(resdata, status, headers) {
                deferred.reject(resdata, status, headers);
            }
        );

        return deferred.promise;
    };

    pubs.getList = function() {
        var deferred = $q.defer();
        $http.get(API_URL + '/datasource/').then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    };
    //Get post for deletion, so user can verify the found post
    pubs.getPost = function(postId) {
        var deferred = $q.defer();
        $http.get(API_URL + "/posts/" + postId).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                console.log('getPost: ' + resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );
        return deferred.promise;
    }
    //Makes the delete API call.
    pubs.deletePost = function(postId) {
        var deferred = $q.defer();
        $http.delete(API_URL + "/posts/" + postId).then(
            function(resdata, status, headers) {
                deferred.resolve(resdata);
                console.log('deletePost: ' + resdata);
            },
            function(resdata, status, headers) {
                deferred.reject(null);
            }
        );

        return deferred.promise;
    }

    return pubs;
}]);

app.service('TokenService', ['$location', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', 'AUTH0_AUDIENCE', function($location, AUTH0_CLIENTID, AUTH0_DOMAIN, AUTH0_AUDIENCE) {
    var pubs = {
        auth0: new Auth0Client({
            client_id: AUTH0_CLIENTID,
            domain: AUTH0_DOMAIN,
            audience: AUTH0_AUDIENCE,
            redirect_uri: $location.absUrl(),
            scope: 'openid email profile'
        })
    };

    pubs.login = function() {
        return pubs.auth0.handleRedirectCallback()
            .catch(function() {
                return pubs.auth0.loginWithRedirect();
            })
    }

    pubs.get = function() {
        return pubs.auth0.getTokenSilently();
    };

    return pubs;
}]);

app.controller('EditorController', ['$scope', '$location', '$sessionStorage', 'Datasource', 'TokenService', 'PagesService', function(scope, $location, $sessionStorage, Datasource, TokenService, PagesService) {
    scope.model = {};
    scope.model.selected_datasource = null;
    scope.model.datasources = [];
    scope.model.changeValue = "";
    scope.model.newValue = "";
    scope.model.selectedValue = {};
    scope.model.values = [];
    scope.model.canUpdateValue = false;
    scope.model.canCreateValue = false;

    scope.model.deleteValue = "";
    scope.model.deletePostId = "";
    scope.model.canDeletePost = false;
    scope.model.foundPost = '';

    scope.model.status = "";
    scope.model.statusType = 'success';

    scope.model.loginStatus = false;
    //Feedback Values for user
    scope.model.history = [];
    //RET EKSISTERENDE VÆRDI

    //Watches the 'Ret eksisternde værdier' inputfield
    scope.$watch(function() {
            //The HTML triggers scope.getValuesByQuery() with the input, ensuring a valid json-object is fetched from the db
            //The scope is updated with the json-object
            return scope.model.selectedValue;
        },
        //if a datasource has been selected: update the changeValue variable with the selectedValue,
        //getting a default value, and trigger valuefield in scope/html.
        function(changeValue) {
            if (scope.model.selected_datasource) {
                scope.model.changeValue = changeValue[scope.model.selected_datasource.valueField];
            }
        }
    );
    //watches the 'changeValue' inputfield
    scope.$watch(function() {
        //updates scope
        return scope.model.changeValue;
    }, function(changeValue) {
        //changes the 'canUpdateValue bool, if changeValue exists & isn't the same as the selectedvalue
        //This then activeates the Button 'Gem Værdi' to be clickable and trigger scope.save()
        //It also deactivates the 'opræt ny værdi' inputværdi
        scope.model.canUpdateValue = scope.model.changeValue && scope.model.changeValue !== scope.model.selectedValue[scope.model.selected_datasource.valueField];
        scope.model.newValue = undefined;
        if (changeValue) {
            scope.model.status = "";
            scope.model.statusType = 'success';
        }
    });

    //ORÆT NY VÆRDI
    //Watch if newValue is changed in scope, update canCreateValue variable.
    scope.$watch(function() {
        return scope.model.newValue;
    }, function(newValue) {
        scope.model.canCreateValue = scope.model.newValue;
        scope.model.changeValue = undefined;
        if (newValue) {
            scope.model.status = "";
            scope.model.statusType = 'success';
        }
    });

    //if Delete input field is triggered
    scope.$watch(function() {
        return scope.model.deleteValue;
    }, function(deleteValue) {
        //if input can be parsed as int
        if (deleteValue && parseInt(deleteValue)) {
            scope.model.canDeletePost = true;
            scope.model.status = "";
            scope.model.statusType = 'success';
        } else {
            scope.model.canDeletePost = false;
        }
    });

    //Unlock Page
    //If 'Side-Id' inputfield has been triggered
    //Update scope if newValue are a compatible integers
    //This also activates the button 'Lås side op' that triggers scope.unlockPage()
    scope.$watch(function() {
        return scope.model.pageId;
    }, function(newValue) {
        //if the inserted value can be parsed to int
        if (newValue && parseInt(newValue)) {
            scope.model.hasPageId = true;
            scope.model.status = "";
            scope.model.statusType = 'success';
        } else {
            scope.model.hasPageId = false;
        }
    });

    //Delete logic
    //Empties foundPost of earlier inputs, hiding the old result (if any)
    scope.getDelete = function() {
        scope.model.foundPost = '';
        var input = scope.model.deleteValue;
        //calls getPost() with input, and receives the json response
        //json is tunred into a more usable js object and updtaes personInfo in scope with created obj
        Datasource.getPost(input).then(function(resdata) {
                var json = resdata
                var person = json;
                var arr = person.data.data[0].fields;
                const personinfo = {};

                for (let i = 0; i < arr.length; i++) {
                    personinfo[arr[i].field_name] = arr[i].value;
                }

                scope.model.foundPost = personinfo;
            },
            function(error) {
                scope.model.statusType = 'error';
                if (error == null) {
                    scope.model.status = "Fejl i sletningen: Ingen post fundet";
                } else {
                    console.log("error: " + error);
                    scope.model.status = "Fejl i sletningen";
                }
            }
        );
    }

    //calls deletePost() and receives feedback that is given to the user
    scope.delete = function() {
        var input = scope.model.deleteValue;
        Datasource.deletePost(input).then(
            function() {
                scope.model.history.push({
                    type: "delete",
                    deletedPost: input
                });
                scope.reset();
                scope.model.status = "Sletningen blev gennemført";
                scope.model.statusType = 'success';
            },
            function(error) {
                scope.model.statusType = 'error';
                if (error == null) {
                    scope.model.status = "Fejl i sletningen: Ingen post fundet";
                } else {
                    console.log("error: " + error);
                    scope.model.status = "Fejl i sletningen";
                }
            }
        );
    }

    scope.unlockPage = function() {
        var pageId = scope.model.pageId;
        var taskId = scope.model.taskId;

        PagesService.unlock(taskId, pageId).then(function(resdata) {
                scope.model.history.push({
                    type: "page_unlock",
                    pageId: pageId,
                    taskId: taskId
                });
                scope.model.pageId = undefined;
                scope.model.taskId = undefined;
            },
            function(error) {
                console.log(error);
                scope.model.status = "Kunne ikke låse siden op.";
                scope.model.statusType = 'error';
            });
    };

    scope.save = function() {
        //If 'Ret eksisterende værdier' 
        if (scope.model.selectedValue.id && (scope.model.changeValue != "" && scope.model.changeValue != undefined)) {
            Datasource.update(scope.model.selected_datasource.id, scope.model.selectedValue.id, scope.model.changeValue, scope.model.selectedValue[scope.model.selected_datasource.valueField], scope.model.selectedValue).then(
                function(resdata) {
                    scope.model.history.push({
                        type: "update",
                        oldValue: scope.model.selectedValue[scope.model.selected_datasource.valueField],
                        newValue: scope.model.changeValue
                    });
                    scope.reset();
                    scope.model.status = "Ændringerne blev gemt";
                    scope.model.statusType = 'success';
                },
                function(error) {
                    console.log(error);
                    scope.model.status = "Fejl: " + error.data.error;
                    scope.model.statusType = 'error';
                }
            );
            //If 'Opret nye værdier'
        } else {
            Datasource.create(scope.model.selected_datasource.id, scope.model.newValue).then(
                function() {
                    scope.model.history.push({
                        type: "create",
                        oldValue: "",
                        newValue: scope.model.newValue
                    });
                    scope.reset();
                    scope.model.status = "Ændringerne blev gemt";
                    scope.model.statusType = 'success';
                },
                function(error) {
                    console.log(error);
                    scope.model.status = "Fejl: " + error.data.error;
                    scope.model.statusType = 'error';
                }
            );
        }
    };
    //Resets Scope/inputfields for the user.
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

    var init = function() {
        TokenService.login().then(function() {
            scope.model.loginStatus = true;
            scope.model.status = 'Henter lister';
            return Datasource.getList()
        }).then(function(data) {
            scope.model.datasources = data.data;
            scope.model.selected_datasource = null;
            scope.model.history = [];
            scope.model.status = "";
            scope.$apply();
        });
    };

    init();
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
