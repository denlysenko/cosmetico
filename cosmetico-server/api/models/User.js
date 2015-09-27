/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

  attributes: {
  	
  	firstName: {
  		type: 'string',
  		required: true
  	},

  	lastName: {
  		type: 'string',
  		required: true
  	},

  	email: {
  		type: 'email',
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string'
  	},

  	deliveryAddress: {
  		type: 'string'
  	},

  	token: {
  		type: 'string'
  	},

  	admin: {
  		type: 'boolean',
  		defaultsTo: false
  	},

  	confirmed: {
  		type: 'boolean',
  		defaultsTo: false
  	},

  	beforeCreate: function(values, next) {
  		if(!values || !(values.password === values.confirm)) {
  			return next({message: 'Password doesn\'t match confirmation!'});
  		}

  		require('bcrypt').hash(values.password, 12, function(err, encryptedPassword) {
  			if(err) return next(err);
  			values.encryptedPassword = encryptedPassword;
  		});
  	}
  }
};

