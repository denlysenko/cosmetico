(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('ContactController', ContactController);

	ContactController.$inject = [
    '$modalInstance',
    '$http',
    'NotificationService'
  ];

	function ContactController($modalInstance, $http, NotificationService) {
		var contact = this;
		contact.credentials = {};

		contact.submit = function() {
			$http.post('/contact', contact.credentials)
          .success(function() {
            contact.cancel();
            NotificationService.success('Your message was successfully sent!');
          })
          .error(function(error) {})
		};

		contact.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();