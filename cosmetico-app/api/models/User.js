/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

'use strict';

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

    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      delete obj.token;
      return obj;
    }
  },
  // requires sails-hooks-validation
  validationMessages: {

    firstName: {
      required:'First Name is required'
    },

     lastName: {
      required:'Last Name is required'
    },

    email: {
      type : 'Please, enter valid email address',
      required: 'Email is required',
      unique: 'Email address is already in use'
    },

  },


	beforeCreate: function(values, next) {

		async.series([
			// generating encryptedPassword
			function(done) {
				if(!values || !(values.password === values.confirm)) {
	  			return done({message: 'Password doesn\'t match confirmation!'});
	  		}

	  		require('bcrypt').hash(values.password, 12, function(err, encryptedPassword) {
	  			if(err) return done(err);
	  			values.encryptedPassword = encryptedPassword;
	  			done();
  			});
  		},
  		// generating token for verification and restoring password
  		function(done) {
  			require('crypto').randomBytes(48, function(err, buf) {
					if(err) return done(err);
				  values.token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
					done();
				});
  		}
		], function(err) {
			if(err) return next(err);
			next();
		});
	}
};

