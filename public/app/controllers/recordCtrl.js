angular.module('recordCtrl', ['recordService'])
    // create new record, controller
    .constant("states", ['Requested','Processed'])
    .controller('recordCreateController', function(Record,states) {
        var vm = this;
        vm.type = "create";
        vm.show = false;
        vm.message = "";
        vm.states = states;  // angular constants
        // create new record 
        vm.insertRecord = function() {
            Record.insert(vm.recData)
                .success(function(data) {
                    vm.show = true;
                    vm.message = data.message;
                    vm.recData = {};
                });
        }
    })
    .controller('recordController', function(Record,states) {
        var vm = this;
        vm.processing = true;
        vm.show = false;
        vm.message = "";
        vm.states = states; // angular constants
        // get all records from DB
        Record.all()
            .success(function(data) {
                vm.processing = false;
                vm.records = data;
            });
        // update only status field in record by _id
        vm.updateRecord = function(id) {
            var set = {};
            set.status = "Processed";
            Record.update(id, set)
                .success(function(data) {
                    vm.show = true;
                    vm.message = data.message;
                    // get all records from DB
                    Record.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.records = data;
                        });
                }).error(function(err) {
                    console.log(err);
                })
        }
    })
    // edit existing record, controller 
    .controller('recordUpdateController', function($routeParams, Record, states) {
        var vm = this;
        vm.type = "edit";
        vm.states = states;  // angular constants
        // get Record by _id
        Record.get($routeParams.id)
            .success(function(data) {
                vm.recData = data;
                vm.recData.doc_date = new Date(data.doc_date);
            });
        // update record by _id    
        vm.insertRecord = function() {
            if (vm.recData.length != 0) {
                Record.edit($routeParams.id, vm.recData)
                    .success(function(data) {
                        vm.show = true;
                        vm.message = data.message;
                        vm.recData = {};
                    })
            }
        }
    });
