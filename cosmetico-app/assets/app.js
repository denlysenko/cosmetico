(function() {
	'use strict';

	angular.module('cosmetico', [
		'ui.bootstrap',
		'ui.utils',
		'ui.router',
		'ngAnimate', 
		'restangular', 
		'toastr'
	]);

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
					controller: 'VerificationController'
				})
				.state('restoring', {
					url: '/user/forgot/reset/:token',
					controller: 'RestoreController'
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

	// toastr config
	angular.module('cosmetico').config(function(toastrConfig) {
	  angular.extend(toastrConfig, {
	    autoDismiss: false,
	    newestOnTop: true,
	    positionClass: 'toast-top-full-width',
	    closeButton: true,
    	closeHtml: '<button>&times;</button>',
	  });
	});

})();

