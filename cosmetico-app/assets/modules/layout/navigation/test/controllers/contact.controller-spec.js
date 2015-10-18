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
      $modalInstance,
      validationError;

  beforeEach(inject(function($rootScope, $controller, _NotificationService_, _$httpBackend_, _$modalInstance_, _validationError_) {
    scope = $rootScope.$new();
    ctrl = $controller('ContactController as contact', {$scope: scope});
    NotificationService = _NotificationService_;
    httpBackend = _$httpBackend_,
    $modalInstance = _$modalInstance_;
    validationError = _validationError_;
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

  it('should call cancel method an Notification.error() when POST was failed', function() {
    var error = {
      data: {
        error: 'Error',
        message: 'Error message'
      }
    };

    scope.contact.credentials = {key: 'value'};

    spyOn(scope.contact, 'cancel');
    spyOn(NotificationService, 'error');
    httpBackend.expectPOST('/contact', scope.contact.credentials).respond(400, error);
    scope.contact.submit();
    httpBackend.flush();
    expect(scope.contact.cancel).toHaveBeenCalled();
    expect(NotificationService.error).toHaveBeenCalled();
  });  

  it('should call validationError.handle() when POST was failed with validation error', function() {
    var error = {
      data: {
        error: 'E_VALIDATION',
        message: 'Error message'
      }
    };

    scope.contact.credentials = {key: 'value'};

    spyOn(validationError, 'handle');
    httpBackend.expectPOST('/contact', scope.contact.credentials).respond(400, error);
    scope.contact.submit();
    httpBackend.flush();
    expect(validationError.handle).toHaveBeenCalled();
  });
});