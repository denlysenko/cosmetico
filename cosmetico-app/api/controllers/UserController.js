/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

	create: function(req, res, next) {
		
		User.create(req.params.all(), function(err, user) {
			if(err) {
				return res.json(err);
			}

			res.json(user);

			//creating verification url
			user.url = req.protocol + '://' + req.get('host') + req.originalUrl + '/verify/' + user.token;

			sails.hooks.views.render('emails/verification', {layout: false, user: user}, function(err, html) {
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
	},

	verify: function(req, res) {
		User.findOneByToken(req.param('token'), function(err, user) {

			if(err) {
				return res.json(err);
			}

			if(user) {
				user.confirmed = true;
				user.save(function(err, user) {
					if(err) return res.json(err);
					res.json(user)
				});
				

				sails.hooks.views.render('emails/verification', {layout: false, user: user}, function(err, html) {
	       if(err) return next(err);

		      var mailOptions = {
		       	to: user.email,
		       	subject: 'Please, verify your email',
		       	template: html
		      };
		      
					// sending email to verify indicated in registration form
					//EmailService.send(mailOptions);	     
		    });
			}
		});
	}

};

// http://localhost:1337/user/create/verify/Y7MiUlpPRJ6OGbpguX17ZPUtHLeuidU9pwTgj8H_cOFpKwnQ_G9jmlDoHGRsX5N3