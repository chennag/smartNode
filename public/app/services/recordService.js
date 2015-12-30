angular.module('recordService', [])
.factory('Record', function($http) {
	// create a new object
	var recordFactory = {};
	recordFactory.all = function() {
		return $http.get('/api/records/');
	};
	recordFactory.update = function(id,set){
		return $http.put('/api/records/' + id,set);
	};
	return recordFactory;
});