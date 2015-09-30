(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('MainController', MainController);

	MainController.$inject = ['$rootScope', 'Authentication'];

	function MainController($rootScope, Authentication) {
		var main = this;
		$rootScope.title = 'Home Page';
		main.user = Authentication;
	}	

		
})();