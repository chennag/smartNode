angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})
		.when('/records',{
            templateUrl: 'app/views/pages/records/records.html',
            controller: 'recordController',
            controllerAs: 'record'
		})
		.when('/records/create',{
			templateUrl: 'app/views/pages/records/newrecord.html',
			controller: 'recordCreateController',
			controllerAs: 'record'
		})
		.when('/reports',{
			templateUrl: 'app/views/pages/reports/reports.html'
		});


	$locationProvider.html5Mode(true);

});
