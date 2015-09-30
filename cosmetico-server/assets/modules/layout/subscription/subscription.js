(function() {
	'use strict';

	angular.module('cosmetico')
			.controller('SubscriptionController', SubscriptionController);

	function SubscriptionController() {
		var subscription = this;
		subscription.email = '';
		subscription.subscribe = function() {
			console.log(subscription.email);
		};
	}		

})();

