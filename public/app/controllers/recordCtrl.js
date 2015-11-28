angular.module('recordCtrl', ['recordService'])
.controller('recordController', function(Record) {
    console.log('in mani controller');
	var vm = this;
	vm.processing = true;
	Record.all()
		.success(function(data) {
			vm.processing = false;
			vm.records = data;
		});

});

