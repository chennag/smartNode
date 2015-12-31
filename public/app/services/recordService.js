angular.module('recordService', [])
.factory('Record', function($http) {
	// create a new object
	var recordFactory = {};
	recordFactory.all = function() {   // get all records from DB
		return $http.get('/api/records/');
	};
	recordFactory.get = function(id){   // get record by id 
       return $http.get('/api/records/'+id);
	};
	recordFactory.update = function(id,set){  // update only status field
		return $http.put('/api/records/' + id,set);
	};
	recordFactory.edit = function(id,set){  // update all fields in a record

	}
	recordFactory.insert = function(set){    // create/insert new record 
		return $http.post('/api/records',set);
	}
	return recordFactory;
});