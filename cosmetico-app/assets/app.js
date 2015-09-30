(function() {
	'use strict';

	angular.module('cosmetico', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'restangular']);

	// app routing
	angular.module('cosmetico').config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'modules/core/home.html',
					controller: 'MainController',
					controllerAs: 'Main'
				})
				.state('verification', {
					url: '/user/verify/:token',
					templateUrl: 'modules/core/home.html',
					controller: 'VerificationController'
				});
	  /* Add New States Above */
	  $urlRouterProvider.otherwise('/');

	});

	angular.module('cosmetico').run(function($rootScope) {

	  $rootScope.safeApply = function(fn) {
	    var phase = $rootScope.$$phase;
	    if (phase === '$apply' || phase === '$digest') {
	      if (fn && (typeof(fn) === 'function')) {
	          fn();
	      }
	    } else {
	      this.$apply(fn);
	    }
	  };

	});

})();

