(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('LoginController', LoginController);

	LoginController.$inject = ['$modalInstance', 'UserService', '$location', 'Authentication'];

	function LoginController($modalInstance, UserService, $location, Authentication) {
		var login = this;
		login.credentials = {};

		login.submit = function() {
			UserService
					.one('login')
					.post(login.credentials)
					.then(function(user) {
						Authentication.user = user;
						$modalInstance.dismiss('cancel');
						$location.path('/');
					}, function(error) {});
		};

		login.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();