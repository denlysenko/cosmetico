describe('handleValidationErrorService', function() {
  beforeEach(module('cosmetico'));

  it('should return function', inject(function(handleValidationError) {
    expect(typeof handleValidationError).toBe('function');
  }));
});