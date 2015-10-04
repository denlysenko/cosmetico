/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

	signup: function(req, res, next) {
		
		User.create(req.params.all(), function(err, user) {
			if(err) {
				return res.serverError();
			}

			res.json(user);

			//creating verification url
			user.url = req.protocol + '://' + req.get('host') + '/#' + req.originalUrl + '/verify/' + user.token;

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

	verify: function(req, res, next) {
		User.findOneByToken(req.param('token'), function(err, user) {

			if(err) {
				return res.serverError();
			}

			if(user) {
				user.confirmed = true;
				user.save(function(err, user) {
					if(err) return res.serverError();
					req.session.user = user;
					res.ok();
				});
				

				sails.hooks.views.render('emails/success.verification', {layout: false, user: user}, function(err, html) {
	       if(err) return next(err);

		      var mailOptions = {
		       	to: user.email,
		       	subject: 'Thanks for verification of email',
		       	template: html
		      };
		      
					// sending email to verify indicated in registration form
					EmailService.send(mailOptions);	     
		    });
			} else {
				res.status(404).json({message: 'Page Not Found!'})
			}
		});
	},

	signin: function(req, res) {
		User.findOneByEmail(req.param('email'), function(err, user) {
			if(err) return res.json(err);
			if(!user) return res.status(404).json({message: 'User Not Found!'});
			require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if(err) return res.serverError();
				if(!valid) {
					res.json({message: 'Incorrect password'})
				}
				req.session.user = user;
				res.ok();
			});
		});
	},

	signout: function(req, res) {
		req.session.destroy();
		res.redirect('/');
	}

};