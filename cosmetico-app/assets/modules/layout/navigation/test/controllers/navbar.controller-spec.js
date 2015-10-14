describe('NavbarController', function() {
  beforeEach(module('cosmetico'));

  var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('NavbarController as navbar', {$scope: scope});
    }));  

  it('should instantiate scope', function() {
    expect(scope.navbar).toBeDefined();
  });

  it('should set initial value of isCollapsed to true', function() {
    scope.navbar.isCollapsed = true;
    expect(scope.navbar.isCollapsed).toEqual(true);
  });
});