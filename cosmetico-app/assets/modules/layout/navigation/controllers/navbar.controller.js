(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('NavbarController', NavbarController);

	function NavbarController() {
		var navbar = this;
		navbar.isCollapsed = true;
	}	
})();