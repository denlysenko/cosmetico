(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = [
		'$stateParams', 
		'UserRestService', 
		'NotificationService', 
		'$location'
	];
	
	function VerificationController($stateParams, UserRestService, NotificationService, $location) {
		UserRestService.one('verify', $stateParams.token)
				.get()
				.then(function() {
					location.href = '/';
				}, function(error) {
					NotificationService.error(error.data.message);
					$location.path('/');
				});
	}		
})();