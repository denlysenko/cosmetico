describe('TopNavController', function() {
  beforeEach(module('cosmetico'));

  var scope,
      ctrl;

  beforeEach(inject(function($rootScope, $controller, SessionService, $modal) {
    scope = $rootScope.$new();
    ctrl = $controller('TopNavController as topNav', {$scope: scope});
    SessionService.user = {};
    spyOn($modal, 'open');
  }));

  it('should initiate user property from SessionService', inject(function(SessionService) {
    scope.topNav.user = SessionService.user;
    expect(scope.topNav.user).toBeDefined();
  }));

  it('should call $modal.open when showLoginForm invoked', inject(function($modal) {
    scope.topNav.showLoginForm();
    expect($modal.open).toHaveBeenCalled();
  }));

  it('should call $modal.open when showRegisterForm invoked', inject(function($modal) {
    scope.topNav.showRegisterForm();
    expect($modal.open).toHaveBeenCalled();
  }));

  it('should call $modal.open when showContactForm invoked', inject(function($modal) {
    scope.topNav.showContactForm();
    expect($modal.open).toHaveBeenCalled();
  }));
});