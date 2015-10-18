/**
Validates Contact Form
**/

'use strict';

var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

module.exports = {
	validate: function(req) {
		var errors = {};
  	
  	if(!req.param('firstName')) {
  		errors.firstName = [{
  			message: 'First Name is required!'
  		}];
  	}

  	if(!req.param('lastName')) {
  		errors.lastName = [{
  			message: 'Last Name is required!'
  		}];
  	}

  	if(!req.param('email')) {
  		errors.email = [{
  			message: 'Email is required!'
  		}];
  	}

  	if(req.param('email') && !req.param('email').match(regexp)) {
  		errors.email = [{
  			message: 'Please, enter valid email!'
  		}];
  	}

  	return errors;
	}
};