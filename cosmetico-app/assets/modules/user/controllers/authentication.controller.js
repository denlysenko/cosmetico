(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('AuthenticationController', AuthenticationController);

	AuthenticationController.$inject = [
		'$modalInstance', 
		'UserRestService',
		'validationError',
		'message',
		'$modal',
		'NotificationService',
		'$timeout'
	];
	
	function AuthenticationController($modalInstance, UserRestService, validationError, message, $modal, NotificationService, $timeout) {
		var auth = this;
		
		auth.credentials = {};
		auth.serverErrors = {};

		auth.signin = function() {
			UserRestService.one('signin').post('', auth.credentials)
					.then(function(user) {
						auth.cancel();
						NotificationService.success('You signed in as ' + user.firstName);
						$timeout(function() {
							location.reload();
						}, 1000);
					}, function(error) {
						auth.cancel();
						NotificationService.error(error.data.message);
					});
		};

		auth.signup = function(form) {
			UserRestService.post(auth.credentials)
				.then(function(response) {
					auth.serverErrors = {};
					auth.cancel();
					message(response, 'proceedRegistration');
				},
				function(error) {
					if(error.data.error === "E_VALIDATION") {
						validationError.handle(error.data.Errors, form, auth);
					} else {
						auth.cancel();
						NotificationService.error(error.data.message);
					}
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
					auth.serverErrors = {};
					auth.cancel();
					message(response, 'proceedRestoring');
				},
				function(error) {
					NotificationService.error(error.data.message);
				});
		};

		auth.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}	
})();