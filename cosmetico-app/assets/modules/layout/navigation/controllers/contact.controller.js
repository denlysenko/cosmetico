(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('ContactController', ContactController);

	ContactController.$inject = [
    '$modalInstance',
    '$http',
    'NotificationService',
    'validationError'
  ];

	function ContactController($modalInstance, $http, NotificationService, validationError) {
		var contact = this;
		contact.credentials = {};

		contact.submit = function(form) {
			contact.serverErrors = {};
			$http.post('/contact', contact.credentials)
          .success(function() {
            contact.cancel();
            NotificationService.success('Your message was successfully sent!');
          })
          .error(function(error) {
          	if(error.data.error === "E_VALIDATION") {
							validationError.handle(error.data.Errors, form, contact);
						} else {
							contact.cancel();
							NotificationService.error(error.data.message);
						}
          });
		};

		contact.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();