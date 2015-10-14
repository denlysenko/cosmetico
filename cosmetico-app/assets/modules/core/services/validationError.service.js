/** This service handles and displays validation errors **/

(function() {
	'use strict';

	angular.module('cosmetico')
			.factory('validationError', ValidationError);

	function ValidationError() {
		return {
      handle: function(errorsObj, form, scope) {

        for(var field in errorsObj) {
          form[field].$setValidity('serverError', false);
          form[field].$setDirty();
          scope.serverErrors[field] = errorsObj[field];
        }
      }
    }; 
	}		
})();

/*{
  "error": "E_VALIDATION",
  "status": 400,
  "summary": "1 attribute is invalid",
  "invalidAttributes": {
    "email": [
      {
        "rule": "unique",
        "value": "den_2710@ukr.net",
        "message": "A record with that `email` already exists (`den_2710@ukr.net`)."
      }
    ]
  },
  "Errors": {
    "email": [
      {
        "rule": "unique",
        "message": "Email address is already in use"
      }
    ]
  }
}*/