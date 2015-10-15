(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = [
		'$stateParams', 
		'UserRestService', 
		'NotificationService', 
		'$location',
    '$window'
	];
	
	function VerificationController($stateParams, UserRestService, NotificationService, $location, $window) {
		UserRestService.one('verify', $stateParams.token)
				.get()
				.then(function() {
					$window.location.href = '/';
				}, function(error) {
					NotificationService.error(error.data.message);
					$location.path('/');
				});
	}		
})();