(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('TopNavController', TopNavController);

	TopNavController.$inject = ['$modal'];		

	function TopNavController($modal) {
		var topNav = this,
				modal;
		
		topNav.showLoginForm = function() {
			modal = $modal.open({
	      templateUrl: '../../../modules/user/views/login.html',
	      controller: 'LoginController',
	      controllerAs: 'login'
	    });
		};

		topNav.showRegisterForm = function() {
			modal = $modal.open({
				templateUrl: '../../../modules/user/views/register.html',
	      controller: 'RegisterController',
	      controllerAs: 'register'
			});
		};

		topNav.showContactForm = function() {
			modal = $modal.open({
				templateUrl: '../../../modules/layout/navigation/views/contact.html',
	      controller: 'ContactController',
	      controllerAs: 'contact'
			});
		};
	}	
})();