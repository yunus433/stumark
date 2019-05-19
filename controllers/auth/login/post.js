const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findUser(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      return res.redirect('/auth/login/?err=100');
    }

    req.session.user = user;
    return res.redirect('/buy/?page=1');
  });
}
