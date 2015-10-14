describe('User Rest Service', function() {
  beforeEach(module('cosmetico'));

  it('should have Restangular injected', inject(function(Restangular) {
    expect(Restangular).toBeDefined();
  }));

  it('should return object', inject(function(UserRestService) {
    expect(typeof UserRestService).toBe('object');
  }));
});