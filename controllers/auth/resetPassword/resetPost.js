const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body && req.body.keyword && req.body.password && req.body.password2 && req.body.password == req.body.password2) {
    User.findOne({
      "email": req.body.email,
      "passwordReset": req.body.keyword
    }, (err, user) => {
      if (err || !user) {
        req.session.error = 'cannot reset';
        return res.redirect('/auth/reset');
      };
      user.password = req.body.password;
      user.passwordReset = "no request";

      user.save(err => {
        if (err) {
          req.session.error = 'cannot reset';
          return res.redirect('/auth/reset');
        }

        return res.redirect('/auth/login');
      });
    });
  } else {
    req.session.error = 'cannot reset';
    return res.redirect('/auth/reset');
  };
};
