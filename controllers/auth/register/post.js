const User = require('../../../models/user/User');
const validator = require('validator');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    const newUserData = {
      email: req.body.email,
      password: req.body.password
    }; 

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) return res.redirect('/auth/register/?err=200');
      if (err) return res.redirect('/');

      req.session.user = user;
      return res.redirect('/buy/?page=1');
    });

  } else {
    return res.redirect('/auth/register/?err=100');
  }
}
