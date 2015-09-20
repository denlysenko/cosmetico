describe('CoreCtrl', function() {

	beforeEach(module('cosmetico'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('MainController', {$scope: scope});
    }));	

	it('should scope be defined', inject(function() {

		expect(scope).toBeDefined();
		
	}));

});