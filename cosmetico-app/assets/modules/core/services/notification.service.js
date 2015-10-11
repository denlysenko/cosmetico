(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('NotificationService', NotificationService);

	NotificationService.$inject = ['toastr'];

	function NotificationService(toastr) {
		return {
			error: function(message) {
				toastr.error(message, 'Error');
			},

			success: function(message) {
				toastr.success(message, 'Success!');
			}
		};
	}		
})();