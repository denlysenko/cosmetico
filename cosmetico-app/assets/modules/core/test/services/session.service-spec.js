describe('SessionService', function() {
  beforeEach(module('cosmetico'));

  it('should return object', inject(function(SessionService) {
    expect(typeof SessionService).toBe('object');
  }));
});