(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('MainController', MainController);

	MainController.$inject = ['$rootScope'];

	function MainController($rootScope) {
		var main = this;
		$rootScope.title = 'Home Page';
	}	

		
})();