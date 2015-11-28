angular.module('recordService', [])
.factory('Record', function($http) {
	// create a new object
	var recordFactory = {};
	recordFactory.all = function() {
		return $http.get('/api/records/');
	};
	return recordFactory;
});