const User = require('../models/user/User');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    User.findUser(req.session.user.email, req.session.user.password, err => {
      if (err) return res.redirect('/auth/login');
      
      next();
     });
  } else {
    return res.redirect('/auth/login');
  };
};
