describe('MainController', function() {

	beforeEach(module('cosmetico'));

	var scope,ctrl,rootScope;

    beforeEach(inject(function($rootScope, $controller) {
			rootScope = $rootScope;
      scope = rootScope.$new();
      ctrl = $controller('MainController as main', {$scope: scope});
    }));	

	it('should define scope', inject(function() {

		expect(scope).toBeDefined();
		
	}));

	it('should set title', function() {
		expect(rootScope.title).toEqual('Home Page');
	});

});