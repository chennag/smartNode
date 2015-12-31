angular.module('recordCtrl', ['recordService'])
    .controller('recordController', function(Record) {
        var vm = this;
        vm.processing = true;
        vm.show = false;
        vm.message = "";
        vm.states = [{
            "name": "Requested",
            "code": "Requested"
        }, {
            "name": "Processed",
            "code": "Processed"
        }];
        // get all records from DB
        Record.all()
            .success(function(data) {
                vm.processing = false;
                vm.records = data;
            });
        // update only status field in record by _id
        vm.updateRecord = function(id, state) {
            var set = {};
            set.status = state;
            Record.update(id, set)
                .success(function(data) {
                    vm.show = true;
                    vm.message = data.message;
                }).error(function(err) {
                    console.log(err);
                })
        }
    })
    // create new record, controller
    .controller('recordCreateController', function(Record, $timeout) {
        var vm = this;
        vm.type = "create";
        vm.show = false;
        vm.message = "";
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
    // edit existing record, controller 
    .controller('recordUpdateController', function($routeParams, Record) {
        var vm = this;
        vm.type = "edit";
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
