const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findUser(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      return res.redirect('/auth/login/?err=100');
    }

    // if (user.verified) {
      req.session.user = user;
      if (req.session.redirect)
        return res.redirect(req.session.redirect);
      else 
        return res.redirect('/');
    // } else {
    //   req.session.notVerifiedUser = user;
    //   return res.redirect('/auth/verify');
    // }
  });
}
