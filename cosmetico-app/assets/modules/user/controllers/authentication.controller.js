(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = [
		'$modalInstance', 
		'UserService',
		'handleValidationError',
		'message'
	];
	
	function AuthenticationController($modalInstance, UserService, handleValidationError, message) {
		var auth = this;
		
		auth.credentials = {};
		auth.serverErrors = {};

		auth.signin = function() {
			UserService.one('signin').post('', auth.credentials)
					.then(function(user) {
						location.reload();
					}, function(error) {});
		};

		auth.signup = function(form) {
			UserService.post(auth.credentials)
				.then(function(response) {
					if(response.error && response.error === "E_VALIDATION") {
						handleValidationError(response.Errors, form, auth);
					} else {
						auth.serverErrors = {};
						auth.cancel();
						message(response);
					}
				},
				function(error) {
					console.log(error);
					auth.cancel();
				});
		};

		auth.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}	
})();