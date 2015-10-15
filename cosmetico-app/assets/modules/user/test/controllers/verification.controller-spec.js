describe('VerificationController', function() {
  beforeEach(module('cosmetico', function($provide) {
    var $window = {
      location: {}
    };
    $provide.value('$window', $window);
  }));

  var scope,
      ctrl,
      httpBackend, 
      UserRestService,
      $window;

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _UserRestService_, _$window_) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    UserRestService = _UserRestService_;
    $window = _$window_;
    ctrl = $controller('VerificationController', {$scope: scope, UserRestService: UserRestService});
  }));

  it('should redirect to Home page when request is successfull', function() {
    spyOn(UserRestService, 'one').and.callThrough();
    var mockToken = 'qwerty';
    UserRestService.one('verify', mockToken);

    expect(UserRestService.one).toHaveBeenCalledWith('verify', mockToken);

    httpBackend.expectGET('/user/verify').respond(200);
   
    httpBackend.flush();
    
    expect($window.location.href).toEqual('/');

  });    
});