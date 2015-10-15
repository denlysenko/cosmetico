describe('RestoreController', function() {
  beforeEach(module('cosmetico'));

  var UserRestService,
      $modal,
      NotificationService,
      scope,
      ctrl, 
      httpBackend,
      $location;

  beforeEach(inject(function(_$rootScope_, _$controller_, _UserRestService_, _$modal_, _NotificationService_, _$httpBackend_, _$location_) {
    scope = _$rootScope_.$new();
    ctrl = _$controller_('RestoreController', {
      $scope: scope      
    });
    UserRestService = _UserRestService_;
    $modal = _$modal_; 
    NotificationService = _NotificationService_; 
    httpBackend = _$httpBackend_;
    $location = _$location_;
    spyOn(UserRestService, 'one').and.callThrough();
  }));

  it('should call $modal.open() when GET was successfull', function() {
    spyOn($modal, 'open');
    httpBackend.expectGET('/user/reset').respond(200);
    httpBackend.flush();
    expect($modal.open).toHaveBeenCalled();
  });    

  it('should call NotificationService.error() and redirect to Home Page', function() {
    spyOn(NotificationService, 'error');
    spyOn($location, 'path');
    
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

    httpBackend.expectGET('/user/reset').respond(400, error);
    httpBackend.flush();
    expect(NotificationService.error).toHaveBeenCalled();
    expect($location.path).toHaveBeenCalledWith('/');
  });

});