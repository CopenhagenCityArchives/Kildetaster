/*
 This is a slim wrapper for Auth0.js which exposes Auth0 as an Angular
 module. Based on this file: https://github.com/Chansen88/angular-auth0/blob/master/dist/angular-auth0.js
*/
define(['auth0.auth0', 'angular'],

function(Auth0, angular) {
  angular
    .module('auth0.auth0', [])
    .provider('angularAuth0', angularAuth0);

  if (typeof angular !== 'object') {
    throw new Error('Angular must be loaded.');
  }

  if (!angular.isObject(Auth0)) {
    throw new Error('Auth0 must be loaded.');
  }

  angular.module('auth0.auth0', []).provider('angularAuth0', angularAuth0);

  function angularAuth0() {
    this.init = function(config) {
      if (!config) {
        throw new Error('Client ID and Domain are required to initialize Auth0.js');
      }
      if (config._telemetryInfo) {
        config._telemetryInfo.env = angular.extend({}, this.config._telemetryInfo.env, {
          'angular-auth0': "3.0.6"
        });
      } else {
        config._telemetryInfo = {
          name: 'angular-auth0',
          version: "3.0.6",
          env: {
            'auth0-js': Auth0.version.raw
          }
        }
      }
      this.config = config;
    };

    this.$get = [
      '$rootScope',
      function($rootScope) {
        var Auth0Js = new Auth0.WebAuth(this.config);
        var webAuth = {};
        var functions = [];

        for (var i in Auth0Js) {
          if (angular.isFunction(Auth0Js[i])) {
            functions.push(i);
          }
          if (angular.isObject(Auth0Js[i])) {
            webAuth[i] = Auth0Js[i];
          }
        }

        function wrapArguments(parameters) {
          var lastIndex = parameters.length - 1,
            func = parameters[lastIndex];
          if (angular.isFunction(func)) {
            parameters[lastIndex] = function() {
              var args = arguments;
              $rootScope.$evalAsync(function() {
                func.apply(Auth0Js, args);
              });
            };
          }
          return parameters;
        }

        for (var i = 0; i < functions.length; i++) {
          webAuth[functions[i]] = (function(name) {
            var customFunction = function() {
              return Auth0Js[name].apply(Auth0Js, wrapArguments(arguments));
            };
            return customFunction;
          })(functions[i]);
        }

        return webAuth;
      }
    ];
  }
});