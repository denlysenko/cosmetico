(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('LoginController', LoginController);

	LoginController.$inject = ['$modalInstance'];

	function LoginController($modalInstance) {
		var login = this;
		login.credentials = {};

		login.submit = function() {
			console.log(login.credentials);
		};

		login.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();