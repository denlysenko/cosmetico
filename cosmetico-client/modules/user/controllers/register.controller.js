(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$modalInstance', '$http', 'message'];

	function RegisterController($modalInstance, $http, message) {
		var register = this;
		register.credentials = {};

		register.submit = function() {
			//$http.post('/user/create', register.credentials)
			$http.get('../../../json/register.json')
				.success(function(user) {
					register.cancel();
					message(user);
				})
				.error(function(error) {
					register.cancel();
				});
		};

		register.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();