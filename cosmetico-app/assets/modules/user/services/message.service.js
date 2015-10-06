(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('message', message);

	message.$inject = ['$modal'];
	
	function message($modal) {
		return function(user, view) {
			$modal.open({
				templateUrl: '../../../modules/user/views/' + view + '.html',
				controller: function($modalInstance) {
					this.user = user;
					this.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				},
				controllerAs: 'message'
			});
		};
	}		
})();