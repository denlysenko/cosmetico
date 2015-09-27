/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {
		var user = _.clone(req.params.all());

		User.create(user, function(err, user) {
			if(err) {
				return res.json(err);
			}

			res.json(user);
		});
	}

};

