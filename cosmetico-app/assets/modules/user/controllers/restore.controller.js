(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('RestoreController', RestoreController);

	RestoreController.$inject = ['UserRestService', '$stateParams', '$modal'];		

	function RestoreController(UserRestService, $stateParams, $modal) {

		var restore = this;
		
		UserRestService.one('reset', $stateParams.token)
				.get()
				.then(function(user) {
					$modal.open({
						templateUrl: '../../../modules/user/views/new.password.html',
						controller: 'NewPasswordController',
						controllerAs: 'newPassword',
						resolve: {
							email: function() {
								return user.email
							}
						}
					});
				}, function() {});
	}		
})();