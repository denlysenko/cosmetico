(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('ContactController', ContactController);

	ContactController.$inject = ['$modalInstance'];

	function ContactController($modalInstance) {
		var contact = this;
		contact.credentials = {};

		contact.submit = function() {
			console.log(contact.credentials);
		};

		contact.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}		
})();