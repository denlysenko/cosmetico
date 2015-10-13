describe('MainController', function() {

	beforeEach(module('cosmetico'));

	var scope,ctrl,rootScope;

  beforeEach(inject(function($rootScope, $controller) {
		rootScope = $rootScope;
    scope = rootScope.$new();
    ctrl = $controller('MainController as main', {$scope: scope});
  }));	

	it('should define scope', inject(function() {
		expect(scope).toBeDefined();
	}));

	it('should set title', function() {
		expect(rootScope.title).toEqual('Home Page');
	});

});

describe('NotificationService', function() {

  beforeEach(module('cosmetico'));

  it('should have toastr injected', inject(function(toastr) {
    expect(toastr).toBeDefined();
  }));

  it('should have two methods', inject(function(NotificationService) {
    var notificationService = NotificationService;
    expect(Object.keys(notificationService).length).toEqual(2);
    expect(typeof notificationService.error).toBe('function');
    expect(typeof notificationService.success).toBe('function');
  }));
});

describe('handleValidationErrorService', function() {
  beforeEach(module('cosmetico'));

  it('should return function', inject(function(handleValidationError) {
    expect(typeof handleValidationError).toBe('function');
  }));
});

describe('SessionService', function() {
  beforeEach(module('cosmetico'));

  it('should return object', inject(function(SessionService) {
    expect(typeof SessionService).toBe('object');
  }));
});