angular.module('psipApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'userCtrl', 'userService', 'recordCtrl', 'recordService', 'msgService'])
    // application configuration to integrate token into requests
    .config(function($httpProvider) {
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    });
