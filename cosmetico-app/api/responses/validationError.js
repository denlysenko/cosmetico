/**
 * 400 (Validation Error) Handler
 *
 * Usage:
 * return res.validationError(data);
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function validationError(error) {
  var res = this.res;
  // Set status code
  res.status(400);

  var err = {
    error: "E_VALIDATION",
    Errors: {}
  };

  err.Errors = error;
  // Send back error message
  res.json(err);
};

/*{
  "error": "E_VALIDATION",
  "status": 400,
  "summary": "1 attribute is invalid",
  "invalidAttributes": {
    "email": [
      {
        "rule": "unique",
        "value": "den_2710@ukr.net",
        "message": "A record with that `email` already exists (`den_2710@ukr.net`)."
      }
    ]
  },
  "Errors": {
    "email": [
      {
        "rule": "unique",
        "message": "Email address is already in use"
      }
    ]
  }
}*/