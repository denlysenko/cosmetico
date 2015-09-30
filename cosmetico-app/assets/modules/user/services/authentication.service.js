(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('Authentication', Authentication);

	function Authentication() {
		var user = {};
		return user;
	}		
})();