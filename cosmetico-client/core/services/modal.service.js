(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('modalService', modalService);

	modalService.$inject = ['$modal'];
	
	function modalService($modal) {
		return function(url, controller, controllerAs) {
			$modal.open({
				templateUrl: url
			});
		};
	}		
})();