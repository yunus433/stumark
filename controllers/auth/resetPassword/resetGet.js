const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.query.id && req.query.keyword) {
    User.findOne({
      "passwordReset": req.query.keyword,
      "_id": mongoose.Types.ObjectId(req.query.id)}, 
      (err, user) => {
        if (err || !user) {
          req.session.error = "cannot reset";
          return res.redirect('/auth/reset');
        }

        req.session.resetUser = {
          keyword: req.query.keyword,
          email: user.email
        };
        return res.redirect('/auth/reset');
      });
  } else {
    return res.redirect('/auth/login');
  }
}
