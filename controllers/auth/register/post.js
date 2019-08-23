const validator = require('validator');

const User = require('../../../models/user/User');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    req.gateway.customer.create({
      email: req.body.email,
      firstName: req.body.name
    }, function(err, result) {
      if (err || !result.success) {
        req.session.error = 'not valid email';
        return res.redirect('/auth/register');
      }

      const newUserData = {
        email: req.body.email,
        name: req.body.name,
        university: req.body.university,
        password: req.body.password,
        customerPaymentId: result.customer.id
      }; 
  
      const newUser = new User(newUserData);
  
      newUser.save((err, user) => {
        if (err && err.code == 11000) {
          req.session.error = 'already taken email';
          return res.redirect('/auth/register');
        }
        if (err) return res.redirect('/');
  
        sendMail({
          email: user.email,
          userId: user._id 
        }, 'userRegister', () => {
          req.session.notVerifiedUser = user;
  
          return res.redirect('/auth/verify');
        });
      });
    });
  } else {
    req.session.error = 'not valid email';
    return res.redirect('/auth/register');
  }
}
