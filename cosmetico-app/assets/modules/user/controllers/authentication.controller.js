(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = [
		'$modalInstance', 
		'UserRestService',
		'handleValidationError',
		'message',
		'$modal'
	];
	
	function AuthenticationController($modalInstance, UserRestService, handleValidationError, message, $modal) {
		var auth = this;
		
		auth.credentials = {};
		auth.serverErrors = {};

		auth.signin = function() {
			UserRestService.one('signin').post('', auth.credentials)
					.then(function(user) {
						location.reload();
					}, function(error) {});
		};

		auth.signup = function(form) {
			UserRestService.post(auth.credentials)
				.then(function(response) {
					if(response.error && response.error === "E_VALIDATION") {
						handleValidationError(response.Errors, form, auth);
					} else {
						auth.serverErrors = {};
						auth.cancel();
						message(response, 'proceedRegistration');
					}
				},
				function(error) {
					console.log(error);
					auth.cancel();
				});
		};

		auth.showResetForm = function() {
			auth.cancel();
			$modal.open({
				templateUrl: '../../../modules/user/views/reset.html',
	      controller: 'AuthenticationController',
	      controllerAs: 'auth'
			});
		};

		auth.forgot = function() {
			UserRestService.one('forgot')
				.post('', auth.credentials)
				.then(function(response) {
					if(response.error && response.error === "E_VALIDATION") {
						handleValidationError(response.Errors, form, auth);
					} else {
						auth.serverErrors = {};
						auth.cancel();
						message(response, 'proceedRestoring');
					}
				},
					function() {});
		};

		auth.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}	
})();