describe('UserNavController', function() {

	beforeEach(module('cosmetico'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('UserNavController as userNav', {$scope: scope});
    }));	

	it('should instantiate scope', inject(function() {
		expect(scope.userNav).toBeDefined();
	}));

	it('should define currencies', inject(function() {
		expect(scope.userNav.currencies).toEqual([
				{name: 'USD'},
				{name: 'EUR'}
			]);
	}));

	it('should set initial value of currency to USD', function() {
		var initValue = scope.userNav.currencies[0];
		expect(scope.userNav.currency).toEqual(initValue);
	});

	it('should define template', function() {
		expect(scope.userNav.template).toBeDefined();
	});

	it('should inititate cart', function() {
		expect(scope.userNav.cart.length).toEqual(4);
	});

	it('should remove item from cart', function() {
		scope.userNav.removeItem({title: 'Product Title 1', thumb: 'http://placehold.it/50x50', price: '$120.00'});
		expect(scope.userNav.cart.length).toEqual(3);
	});

});