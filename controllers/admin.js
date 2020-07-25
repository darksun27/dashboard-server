const User = require('../models/user');
module.exports = {
    isAdmin: function(req, res, next) {
    const email = req.user.email;
    User.findOne({ email: email }, function(err, user) {
      if (err) { return next(err); }
      if(user['type'] == "admin") {
        next();
      }
      else {res.send("Unauthorized")}
    })
  }
}