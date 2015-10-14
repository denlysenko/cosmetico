describe('NewPasswordController', function() {
  var mockEmailFactory;

  beforeEach(module('cosmetico', function($provide) {
    mockEmailFactory = {
      email: 'email@email.com'
    }
    $provide.value('email', mockEmailFactory);
  }));

  var scope,
      UserRestService,
      NotificationService,
      httpBackend,
      mockEmail,
      mockData;

  beforeEach(inject(function($rootScope, $controller, _UserRestService_, _NotificationService_, _$httpBackend_, email) {
    scope = $rootScope.$new();
    ctrl = $controller('NewPasswordController as newPassword', {$scope: scope});
    UserRestService = _UserRestService_;
    NotificationService = _NotificationService_;
    httpBackend = _$httpBackend_;
    mockEmail = email;
    mockData = {
      email: mockEmail.email,
      password: 'password',
      confirm: 'password'
    };
  }));

  it('should initialize credentials as an empty object', function() {
    scope.newPassword.credentials = {};
    expect(scope.newPassword.credentials).toBeDefined();
  });

  it('should take an email from email service', function() {
    scope.newPassword.credentials.email = mockEmail.email;
    expect(scope.newPassword.credentials.email).toEqual('email@email.com');
  });

  it('should call NotificationService.success() when POST was successfull', function() {
    spyOn(UserRestService, 'one').and.callThrough();
    spyOn(NotificationService, 'success');

    scope.newPassword.credentials = mockData;
    scope.newPassword.save();

    httpBackend.expectPOST('/user/save_password', scope.newPassword.credentials).respond(200);

    httpBackend.flush();

    expect(NotificationService.success).toHaveBeenCalled();

  }); 

  it('should call NotificationService.error when POST was failed', function() {
    spyOn(UserRestService, 'one').and.callThrough();
    spyOn(NotificationService, 'error');

    var error = {
      data: {
        message: 'Error Message'
      }
    };

    scope.newPassword.credentials = mockData;
    scope.newPassword.save();

    httpBackend.expectPOST('/user/save_password', scope.newPassword.credentials).respond(400, error);

    httpBackend.flush();

    expect(NotificationService.error).toHaveBeenCalled();
  });   
});