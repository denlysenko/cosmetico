/** Email.js
** Email Service sends emails using nodemailer.js 
** @param options {plain object}
** @param to {string} email address to send mail
** @param subject {string} 
** @param template rendered html
**/

'use strict';

var transporter = require('nodemailer').createTransport(sails.config.nodemailer);

module.exports = {

	send: function(options) {

		transporter.sendMail({
	    from: 'noreply@cosmetico',
	    to: options.to,
	    subject: options.subject,
	    html: options.template
		});
	}
};