describe('ContactController', function() {
  beforeEach(module('cosmetico', function($provide) {
    var modalInstanceMock = {
      dismiss: function() {
        return true;
      }
    };
    $provide.value('$modalInstance', modalInstanceMock);
  }));
  var scope,
      ctrl,
      NotificationService,
      httpBackend,
      $modalInstance;

  beforeEach(inject(function($rootScope, $controller, _NotificationService_, _$httpBackend_, _$modalInstance_) {
    scope = $rootScope.$new();
    ctrl = $controller('ContactController as contact', {$scope: scope});
    NotificationService = _NotificationService_;
    httpBackend = _$httpBackend_,
    $modalInstance = _$modalInstance_;
  }));

  it('should initiate credentials as an empty object', function() {
    scope.contact.credentials = {};
    expect(scope.contact.credentials).toBeDefined();
  });

  it('should call $modalInstance.dismiss() when cancel method invoked', function() {
    spyOn($modalInstance, 'dismiss');
    scope.contact.cancel();
    expect($modalInstance.dismiss).toHaveBeenCalled();
  });

  it('should call cancel method and NotificationService.success() when POST was successfull', function() {
    spyOn(scope.contact, 'cancel');
    spyOn(NotificationService, 'success');
    httpBackend.expectPOST('/contact').respond(200);
    scope.contact.submit();
    httpBackend.flush();
    expect(scope.contact.cancel).toHaveBeenCalled();
    expect(NotificationService.success).toHaveBeenCalled();
  });    
});