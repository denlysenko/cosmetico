(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$modalInstance'];

	function RegisterController($modalInstance) {
		var register = this;
		register.credentials = {};

		register.submit = function() {
			console.log(register.credentials);
		};

		register.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();