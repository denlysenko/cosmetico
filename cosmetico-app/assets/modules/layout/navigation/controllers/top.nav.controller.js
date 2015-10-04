(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('TopNavController', TopNavController);

	TopNavController.$inject = [
		'$modal', 
		'SessionService'
	];		

	function TopNavController($modal, SessionService) {
		var topNav = this,
				modal;
		
		topNav.user = SessionService.user;

		topNav.showLoginForm = function() {
			modal = $modal.open({
	      templateUrl: '../../../modules/user/views/login.html',
	      controller: 'AuthenticationController',
	      controllerAs: 'auth'
	    });
		};

		topNav.showRegisterForm = function() {
			modal = $modal.open({
				templateUrl: '../../../modules/user/views/register.html',
	      controller: 'AuthenticationController',
	      controllerAs: 'auth'
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