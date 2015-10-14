describe('SubscriptionController', function() {

  beforeEach(module('cosmetico'));

  var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('SubscriptionController as subscription', {$scope: scope});
    }));  

  it('should initiate email as an empty string', inject(function() {

    expect(scope.subscription.email).toEqual('');
    
  }));

  // it('should send email', function() {
  //  scope.subscription.email = 'email@email.com';
  //  scope.subscription.subscribe()
  // });

});