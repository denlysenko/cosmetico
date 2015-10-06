(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('VerificationController', VerificationController);

	VerificationController.$inject = ['$stateParams', 'UserRestService'];
	
	function VerificationController($stateParams, UserRestService) {
		UserRestService.one('verify', $stateParams.token)
				.get()
				.then(function() {
					location.href = '/';
				}, function(error) {

				});
	}		
})();