describe('UserNavController', function() {

  beforeEach(module('cosmetico'));

  var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller, SessionService) {
      scope = $rootScope.$new();
      ctrl = $controller('UserNavController as userNav', {$scope: scope});
      SessionService.user = {};
      scope.userNav.user = SessionService.user;
      scope.userNav.currencies = [
        {name: 'USD'},
        {name: 'EUR'}
      ];
      scope.userNav.template = 'template';
      scope.userNav.cart = [
        {title: 'Product Title 1', thumb: 'http://placehold.it/50x50', price: '$120.00'},
        {title: 'Product Title 2', thumb: 'http://placehold.it/50x50', price: '$120.00'},
        {title: 'Product Title 3', thumb: 'http://placehold.it/50x50', price: '$120.00'},
        {title: 'Product Title 4', thumb: 'http://placehold.it/50x50', price: '$120.00'}
      ];
    }));  

  it('should initiate user property of scope', function() {
    expect(scope.userNav.user).toBeDefined();
  });

  it('should define currencies', function() {
    expect(scope.userNav.currencies.length).toEqual(2);
  });

  it('should set initial value of currency to USD', function() {
    scope.userNav.currency = scope.userNav.currencies[0];
    expect(scope.userNav.currency.name).toEqual('USD');
  });

  it('should define template', function() {
    expect(scope.userNav.template).toEqual('template');
  });

  it('should inititate cart', function() {
    expect(scope.userNav.cart.length).toEqual(4);
  });

  it('should remove item from cart', function() {
    scope.userNav.removeItem({title: 'Product Title 1', thumb: 'http://placehold.it/50x50', price: '$120.00'});
    expect(scope.userNav.cart.length).toEqual(3);
  });

});