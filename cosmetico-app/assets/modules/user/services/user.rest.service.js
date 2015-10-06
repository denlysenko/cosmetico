/** This service creates base URL for REST operations with User **/

(function() {
	'use strict';
	
	angular.module('cosmetico')
			.factory('UserRestService', UserRestService);

	UserRestService.$inject = ['Restangular'];
	
	function UserRestService(Restangular) {
		return Restangular.all('user');
	}		
})();