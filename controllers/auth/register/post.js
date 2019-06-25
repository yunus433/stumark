const validator = require('validator');

const User = require('../../../models/user/User');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    const newUserData = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }; 

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) return res.redirect('/auth/register/?err=200');
      if (err) return res.redirect('/');

      req.session.user = user;

      sendMail({
        email: user.email,
        userId: user._id 
      }, 'userRegister', () => {
        req.session.notVerifiedUser = user;

        return res.redirect('/auth/verify');
      });
    });

  } else {
    return res.redirect('/auth/register/?err=100');
  }
}
