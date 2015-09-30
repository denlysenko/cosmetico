/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

	create: function(req, res, next) {
		var user = _.clone(req.params.all());

		User.create(user, function(err, user) {
			if(err) {
				return res.json(err);
			}

			// sending back to the client only needed fields without secret information
			var userObj = {
				firstName: user.firstName, 
				email: user.email
			};

			res.json(userObj);
			// adding verification link
			userObj.url = req.protocol + '://' + req.get('host') + req.originalUrl + '/verify/' + user.token;

			sails.hooks.views.render('emails/verification', {layout: false, user: userObj}, function(err, html) {
	      if(err) return next(err);

	      var mailOptions = {
	      	to: user.email,
	      	subject: 'Please, verify your email',
	      	template: html
	      };
	      
				// sending email to verify indicated in registration form
				EmailService.send(mailOptions);	     
	    });
			
		});
	}

};

// http://localhost:1337/user/create/verify/Y7MiUlpPRJ6OGbpguX17ZPUtHLeuidU9pwTgj8H_cOFpKwnQ_G9jmlDoHGRsX5N3