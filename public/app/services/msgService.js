angular.module('msgService', [])
.factory('msg', function ($timeout) {
	
	return {
		hideMsg: function(){        // hide function for alerts-bootstrap
			$timeout(function() {
				  var vm = this;
                  vm.show = false;
            }, 6000)
		}
	}
})