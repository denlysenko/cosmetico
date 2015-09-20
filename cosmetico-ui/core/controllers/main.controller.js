(function() {
	'use strict';



	angular.module('cosmetico')
			.controller('MainController', MainController);

	MainController.$inject = ['$scope'];

	function MainController($scope) {
		var main = this;
		main.title = 'Home Page';
	}	

	
	
		
})();