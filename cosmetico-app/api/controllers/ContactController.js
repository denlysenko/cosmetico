/**
 * ContactController
 *
 * @description :: Server-side logic for managing contact messages 
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 'use strict';

 module.exports = {
  send: function(req, res) {
  	
  	var errors = contactFormValidator.validate(req);

  	if(Object.keys(errors).length) {
  		res.validationError(errors);
  	} else {

  		sails.hooks.views.render('emails/message', {layout: false, message: req.params.all()}, function(err, html) {
	       if(err) return res.serverError(err);

	      var mailOptions = {
	       	to: 'den_2710@ukr.net',
	       	subject: 'You have a message from Cosmetico',
	       	template: html
	      };
	      
	      res.ok();

				// sending email to verify indicated in registration form
				EmailService.send(mailOptions);	     
	    });
  	}
  }
 };
