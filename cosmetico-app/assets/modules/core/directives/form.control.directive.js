(function() {
	'use strict';

	angular.module('cosmetico')
			.directive('formControl', function() {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, element, attrs, ngModelCtrl) {
						element.on('keydown', function() {
							ngModelCtrl.$setValidity('serverError', true);
						});
					}
				};
			});
})();