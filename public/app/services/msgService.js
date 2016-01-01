angular.module('msgService', [])
    .factory('msg', function($timeout) {

        return function(ele) { // hide function for alerts-bootstrap
            console.log('demo');
            $timeout(function() {
                var vm = ele;
                ele = false;
            }, 6000)
        }
    })
