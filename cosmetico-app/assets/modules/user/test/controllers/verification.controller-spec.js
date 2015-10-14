describe('VerificationController', function() {
  beforeEach(module('cosmetico'));

  var scope,
      ctrl,
      httpBackend, 
      UserRestService,
      $location;

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _UserRestService_, _$location_) {
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    UserRestService = _UserRestService_;
    $location = _$location_;
    ctrl = $controller('VerificationController', {$scope: scope, UserRestService: UserRestService});
  }));

  it('should redirect to Home page when request is successfull', function() {
    spyOn(UserRestService, 'one').and.callThrough();
    var mockToken = 'qwerty';
    UserRestService.one('verify', mockToken);

    expect(UserRestService.one).toHaveBeenCalledWith('verify', mockToken);

    httpBackend.expectGET('/user/verify/qwerty').respond(200);

    scope.$digest();
    httpBackend.flush();

    
    //expect(location.href).toEqual('/');

  });    
});