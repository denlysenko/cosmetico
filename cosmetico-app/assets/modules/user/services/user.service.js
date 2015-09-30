/** This service creates base URL for REST operations with User **/

(function() {
	'use strict';
	
	angular.module('cosmetico')
			.factory('UserService', UserService);

	UserService.$inject = ['Restangular'];
	
	function UserService(Restangular) {
		return Restangular.all('user');
	}		
})();