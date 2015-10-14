describe('ValidationErrorService', function() {
  beforeEach(module('cosmetico'));

  it('should have one method', inject(function(validationError) {
    expect(Object.keys(validationError).length).toEqual(1);
  }));
});