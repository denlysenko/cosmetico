(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('SessionService', SessionService);

	function SessionService() {
		var _this = this;

		_this._data = window.session;

		return _this._data;
	}		
})();