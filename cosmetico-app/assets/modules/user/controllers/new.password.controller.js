(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('NewPasswordController', NewPasswordController);

	NewPasswordController.$inject = ['UserRestService', 'email'];

	function NewPasswordController(UserRestService, email) {
		var newPassword = this;
		newPassword.credentials = {};
		newPassword.credentials.email = email;

		newPassword.save = function() {
			UserRestService.one('save_password')
					.post('', newPassword.credentials)
					.then(function() {
						location.href = '/';
					}, function() {});
		};
	}		
})();