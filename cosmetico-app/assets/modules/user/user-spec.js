describe('Message Service', function() {
  beforeEach(module('cosmetico'));

  it('should have $modal injected', inject(function($modal) {
    expect($modal).toBeDefined();
  }));

  it('should return function', inject(function(message) {
    expect(typeof message).toBe('function');
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