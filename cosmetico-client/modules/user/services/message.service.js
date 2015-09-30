(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('message', message);

	message.$inject = ['$modal'];
	
	function message($modal) {
		return function(user) {
			$modal.open({
				templateUrl: '../../../layout/navigation/views/message.html',
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