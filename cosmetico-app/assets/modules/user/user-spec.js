describe('Message Service', function() {
  beforeEach(module('cosmetico'));

  it('should have $modal injected', inject(function($modal) {
    expect($modal).toBeDefined();
  }));

  it('should call $modal.open method when message service was invoked', inject(function(message, $modal) {
    spyOn($modal, 'open');
    message();
    expect($modal.open).toHaveBeenCalled();
  }));
});

describe('User Rest Service', function() {
  beforeEach(module('cosmetico'));

  it('should have Restangular injected', inject(function(Restangular) {
    expect(Restangular).toBeDefined();
  }));

  it('should return object', inject(function(UserRestService) {
    expect(typeof UserRestService).toBe('object');
  }));
});