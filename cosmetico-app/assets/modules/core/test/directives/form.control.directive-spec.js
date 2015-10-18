describe('FormControl Directive', function() {
	beforeEach(module('cosmetico'));

	var compile, 
			scope,
			elem;

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		compile = $compile;
		var el = angular.element('<input type="text" form-control ng-model="test">');
		elem = compile(el)(scope);
		scope.$digest();
	}));

	it('should set validity of server error to true when keydown event fired', function() {
		elem.triggerHandler('keydown');
		expect(elem.hasClass('ng-valid-server-error')).toBe(true);
	});
});