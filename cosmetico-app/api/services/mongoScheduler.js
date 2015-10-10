/** Service for removing unconfirmed users every 1 hour **/

var Agenda = require('agenda');
var agenda = new Agenda({db: sails.config.mongoscheduler});

module.exports = {

	exec: function() {
		agenda.define('delete unconfirmed users', function(job, done) {
		  User.destroy({confirmed: false}, done);
		});

		agenda.every('1 hour', 'delete unconfirmed users');

		agenda.start();
	}
};

		