describe('AuthenticationController', function() {
  beforeEach(module('cosmetico', function($provide) {
    var mockModalInstance = {
      dismiss: function() {}
    };
    $provide.value('$modalInstance', mockModalInstance);
  }));

  var scope, ctrl, UserRestService, handleValidationError, message, NotificationService, httpBackend, mockUser, $modalInstance, $modal;

  beforeEach(inject(function($rootScope, $controller, _UserRestService_, _handleValidationError_, _message_, _NotificationService_, _$httpBackend_, _$modal_, _$modalInstance_) {
    scope = $rootScope.$new();
    ctrl = $controller('AuthenticationController as auth', {$scope: scope});
    UserRestService = _UserRestService_;
    handleValidationError = _handleValidationError_;
    message = _message_;
    NotificationService = _NotificationService_;
    httpBackend = _$httpBackend_;
    $modalInstance = _$modalInstance_;
    $modal = _$modal_;
  }));

  it('should initialize credentials', function() {
    scope.auth.credentials = {};
    expect(scope.auth.credentials).toBeDefined();
  });

  it('should initialize serverErrors', function() {
    scope.auth.serverErrors = {};
    expect(scope.auth.serverErrors).toBeDefined();
  });

  it('should call $modalInstance.dismiss() when cancel method was invoked', function() {
    spyOn($modalInstance, 'dismiss');
    scope.auth.cancel();
    expect($modalInstance.dismiss).toHaveBeenCalled();
  });

  describe('signin method', function() {

    beforeEach(function() {
      spyOn(UserRestService, 'one').and.callThrough();
      spyOn(scope.auth, 'cancel');
      mockUser = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'email@email.com'
      };
    });

    it('should call auth.cancel() and NotificationService.success() when Post was successfull', function() {
      spyOn(NotificationService, 'success');

      scope.auth.credentials = mockUser;

      httpBackend.expectPOST('/user/signin', scope.auth.credentials).respond(200, mockUser);

      scope.auth.signin();

      httpBackend.flush();

      expect(scope.auth.cancel).toHaveBeenCalled();
      expect(NotificationService.success).toHaveBeenCalled();
    });

    it('should call auth.cancel() and NotificationService.error() when POST failed', function() {
      spyOn(NotificationService, 'error');

      var error = {
        data: {
          message: 'Error Message'
        }
      };

      scope.auth.credentials = mockUser;

      httpBackend.expectPOST('/user/signin', scope.auth.credentials).respond(400, error);

      scope.auth.signin();

      httpBackend.flush();

      expect(scope.auth.cancel).toHaveBeenCalled();
      expect(NotificationService.error).toHaveBeenCalled();

    });

  });

  describe('signup method', function() {
    it('should clear serverErrors object, call cancel method and call message service, which in turn calls $modal.open', function() {
     
      spyOn($modal, 'open');
      spyOn(scope.auth, 'cancel');

      scope.auth.credentials = mockUser;

      httpBackend.expectPOST('/user', scope.auth.credentials).respond(mockUser);

      scope.auth.signup();

      httpBackend.flush();

      expect(Object.keys(scope.auth.serverErrors).length).toEqual(0);
      expect(scope.auth.cancel).toHaveBeenCalled();
      expect($modal.open).toHaveBeenCalled();
    });

    it('should call cancel method and NotificationService.error() when POST failed and error is not validation error', function() {
      spyOn(scope.auth, 'cancel');
      spyOn(NotificationService, 'error');

      var error = {
        data: {
          error: 'error',
          message: 'Error Message'
        }
      };

      scope.auth.credentials = mockUser; 

      httpBackend.expectPOST('/user', scope.auth.credentials).respond(400, error);

      scope.auth.signup();
      httpBackend.flush();

      expect(scope.auth.cancel).toHaveBeenCalled();
      expect(NotificationService.error).toHaveBeenCalled();
    });

    it('should invoke handleValidationError when POST failed with validation error', function() {

      jasmine.createSpy(handleValidationError);
      
      var error = {
        data: {
          error: 'E_VALIDATION',
          Errors: {
            email: [
              {
                rule: "unique",
                message: "Email address is already in use"
              }
            ]
          }
        }
      };

      scope.auth.credentials = mockUser; 
      scope.auth.form = {};

      httpBackend.expectPOST('/user', scope.auth.credentials).respond(400, error);

      scope.auth.signup(scope.auth.form);
      httpBackend.flush();
      expect(handleValidationError).toHaveBeenCalled();
    });
  });

  describe('showResetForm method', function() {
    beforeEach(function() {
      spyOn($modal, 'open');
      spyOn(scope.auth, 'cancel');
    });

    it('should call cancel method', function() {
      scope.auth.showResetForm();
      expect(scope.auth.cancel).toHaveBeenCalled();
    });

    it('should call $modal.open()', function() {
      scope.auth.showResetForm();
      expect($modal.open).toHaveBeenCalled();
    });
  });
});