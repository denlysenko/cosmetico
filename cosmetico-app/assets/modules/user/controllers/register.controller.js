(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$modalInstance', 'UserService', 'message', 'handleValidationError'];

	function RegisterController($modalInstance, UserService, message, handleValidationError) {
		var register = this;
		register.credentials = {};
		register.serverErrors = {};

		register.submit = function(form) {
			UserService.post(register.credentials)
				.then(function(response) {
					if(response.error && response.error === "E_VALIDATION") {
						handleValidationError(response.Errors, form, register);
					} else {
						register.serverErrors = {};
						register.cancel();
						message(response);
					}
				},
				function(error) {
					console.log(error);
					register.cancel();
				});
		};

		register.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();