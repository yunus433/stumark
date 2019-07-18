const User = require('../models/user/User');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    User.findById(req.session.user._id, (err, user) => {
      if (err) return res.redirect('/auth/login');
      req.session.user = user;
      next();
    });
  } else {
    req.session.redirect = req.originalUrl;
    res.redirect('/auth/login');
  };
};
