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