(function() {
	'use strict';

	angular.module('cosmetico', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

	// app routing
	angular.module('cosmetico').config(function($stateProvider, $urlRouterProvider) {

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'core/home.html',
			controller: 'MainController',
			controllerAs: 'Main'
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

