angular.module('recordCtrl', ['recordService'])
.controller('recordController', function($timeout,Record) {
	var vm = this;
	vm.processing = true;
	vm.show = false;
	vm.message = "";
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
		    .success(function(data){
		     vm.show = true;	
		     vm.message = "!! Record Successfully Processed";
		     $timeout(function(){
		     	vm.show = false;
		     },6000)
		}).error(function(err){
		    console.log(err);
		})
	}	
})
// create new record controller
.controller('recordCreateController', function(Record){
	console.log('in recordCreateController');
	var vm = this;
	vm.show = false;
    vm.message = "";
	
    vm.hideMessage = function(){
    	setTimeout(function(){
    		vm.show = false;
    	},1000)
    }
	vm.insertRecord = function(){
        Record.insert(vm.recData)
           .success(function(data) {
				console.log(data.message);
				vm.show = true;
				vm.message = data.message;
				vm.recData = {};
				vm.hideMessage();
			});	
	}
})
// edit existing record controller 
.controller('recordEditController',function(Record){
   var vm = this;
})

