(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('NewPasswordController', NewPasswordController);

	NewPasswordController.$inject = [
		'UserRestService', 
		'email', 
		'NotificationService', 
		'$timeout'
	];

	function NewPasswordController(UserRestService, email, NotificationService, $timeout) {
		var newPassword = this;
		newPassword.credentials = {};
		newPassword.credentials.email = email;

		newPassword.save = function() {
			UserRestService.one('save_password')
					.post('', newPassword.credentials)
					.then(function() {
						NotificationService.success('Your password was saved!');
						$timeout(function() {
							location.href = '/';
						}, 1000);
					}, function(error) {
						NotificationService.error(error.data.message);
					});
		};
	}		
})();