(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('NewPasswordController', NewPasswordController);

	

	function NewPasswordController() {
		var newPassword = this;
		newPassword.credentials = {};
		console.log(newPassword)

		newPassword.save = function() {
			console.log(newPassword.credentials)
		};
	}		
})();