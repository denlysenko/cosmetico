(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = ['$stateParams', 'UserService'];
	
	function VerificationController($stateParams, UserService) {
		UserService.one('verify', $stateParams.token)
				.get()
				.then(function() {
					location.href = '/';
				}, function(error) {

				});
	}		
})();