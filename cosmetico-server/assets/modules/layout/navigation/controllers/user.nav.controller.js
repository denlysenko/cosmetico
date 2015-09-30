(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('UserNavController', UserNavController);

		//UserNavController.$inject = ['$scope'];

		function UserNavController() {
			var userNav = this;

			userNav.currencies = [
				{name: 'USD'},
				{name: 'EUR'}
			];

			userNav.currency = userNav.currencies[0];

			userNav.user = {};

			userNav.template = 'cart.preview.html';

			userNav.cart = [
				{title: 'Product Title 1', thumb: 'http://placehold.it/50x50', price: '$120.00'},
				{title: 'Product Title 2', thumb: 'http://placehold.it/50x50', price: '$120.00'},
				{title: 'Product Title 3', thumb: 'http://placehold.it/50x50', price: '$120.00'},
				{title: 'Product Title 4', thumb: 'http://placehold.it/50x50', price: '$120.00'}
			];

			userNav.removeItem = function(item) {
				userNav.cart.splice(userNav.cart.indexOf(item), 1);
			};
		}	

})();