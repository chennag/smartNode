angular.module('msgService', [])
.factory('msgService', function ($timeout) {
	var vm = this;
	return {
		hideMsg: function(){
			$timeout(function() {
                  vm.show = false;
            }, 6000)
		}
	}
})