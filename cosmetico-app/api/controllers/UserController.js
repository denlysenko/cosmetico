/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

	signup: function(req, res) {
		
		User.create(req.params.all(), function(err, user) {
			if(err) {
				return res.serverError(err);
			}

			res.json(user);

			//creating verification url
			user.url = req.protocol + '://' + req.get('host') + '/#' + req.originalUrl + '/verify/' + user.token;

			sails.hooks.views.render('emails/verification', {layout: false, user: user}, function(err, html) {
	       if(err) return serverError(err);

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
				return res.serverError(err);
			}

			if(!user) return res.notFound('User Not Found!');
			
			// check if token has expired
			if(user.tokenExpires.getTime() < Date.now()) {
				return res.badRequest('Token has expired! Please, try again');
			}

			user.confirmed = true;
			// reset tokens
			user.token = null;
			user.tokenExpires = null;

			user.save(function(err, user) {
				if(err) return res.serverError(err);
				req.session.user = user;
				res.ok();
			});

			sails.hooks.views.render('emails/success.verification', {layout: false, user: user}, function(err, html) {
       if(err) return serverError(err);

	      var mailOptions = {
	       	to: user.email,
	       	subject: 'Thanks for verification of email',
	       	template: html
	      };
	      
				// sending email to verify indicated in registration form
				EmailService.send(mailOptions);	     
	    });
		});
	},

	signin: function(req, res) {
		User.findOne({email: req.param('email'), confirmed: true}, function(err, user) {
			if(err) return res.serverError(err);
			if(!user) return res.notFound('User Not Found!');
			require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if(err) return res.serverError(err);
				if(!valid) {
					return res.badRequest('Incorrect password');
				}
				req.session.user = user;
				res.json(user);
			});
		});
	},

	signout: function(req, res) {
		req.session.destroy();
		res.redirect('/');
	},

	forgot: function(req, res, next) {
		async.waterfall([
			function(done) {
				User.findOne({email: req.param('email'), confirmed: true}, function(err, user) {
					if(err) return done(err);
					if(!user) return res.notFound('User Not Found!');
					done(null, user);
				});
			},
			function(user, done) {
				require('crypto').randomBytes(48, function(err, buf) {
					if(err) return done(err);
				  user.token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
          user.tokenExpires = new Date(Date.now() + 60000); // + 1 hour
          user.save(function(err) {
          	if(err) return done(err);
						done(null, user);
          });
				});
			}
		], function(err, user) {
			if(err) return res.serverError(err);
			res.json(user);
			//creating verification url
			user.url = req.protocol + '://' + req.get('host') + '/#' + req.originalUrl + '/reset/' + user.token;

			sails.hooks.views.render('emails/reset', {layout: false, user: user}, function(err, html) {
	       if(err) return serverError(err);

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

	validateToken: function(req, res) {
		async.waterfall([
			function(done) {
				User.findOneByToken(req.param('token'), function(err, user) {
					if(err) return done(err);
					if(!user) return res.notFound('User Not Found!');
					// check if token has expired
					if(user.tokenExpires.getTime() < Date.now()) return res.badRequest('Token has expired! Please, try again');
					done(null, user);
				});
			},
			function(user, done) {
				user.token = null;
				user.tokenExpires = null;
				user.save(function(err, user) {
					if(err) return done(err);
					done(null, user);
				});
			}
		], function(err, user) {
			if(err) return res.serverError(err);
			res.json(user);
		});
	},

	savePassword: function(req, res) {
		if(req.param('password').length < 6 && req.param('password') !== req.param('confirm')) {
			return res.badRequest('Password is to small or Password doesn\'t match confirmation');
		}
		
		User.findOneByEmail(req.param('email'), function(err, user) {
			if(err) return res.serverError(err);
			if(!user) return res.notFound('User Not Found!');
			req.session.user = user;
			res.ok();
		});
	}

};