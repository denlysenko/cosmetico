(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = ['$stateParams', 'UserService', '$location'];
	
	function VerificationController($stateParams, UserService, $location) {
		UserService.one('verify', $stateParams.token)
				.get()
				.then(function(user) {
					this.user = user;
					// TODO save user in Authentcation object
					$location.path('/');
				}, function(error) {});
	}		
})();