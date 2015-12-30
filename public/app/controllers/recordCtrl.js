angular.module('recordCtrl', ['recordService'])
.controller('recordController', function(Record) {
	var vm = this;
	vm.processing = true;
	vm.states = [
		{"name":"Requested","code":"Requested"},
  		{"name":"Processed","code":"Processed"}
	];
	Record.all()
		.success(function(data) {
			vm.processing = false;
			vm.records = data;
		});
	vm.updateRecord = function(id,state){
		var set = {};
		set.status = state;
		Record.update(id,set)
		    .success(function(res){
		     console.log(res);
		});
	}	
});

