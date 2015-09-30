(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = ['$stateParams', 'UserService', '$location', 'Authentication'];
	
	function VerificationController($stateParams, UserService, $location, Authentication) {
		console.log($stateParams.token)
		UserService.one('verify', $stateParams.token)
				.get()
				.then(function(user) {
					if(user) {
						Authentication = user;
						$location.path('/');
					} else {

					}
					
				}, function(error) {});
	}		
})();