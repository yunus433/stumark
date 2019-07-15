const validator = require('validator');
const crypto = require('crypto');

const User = require('../../../models/user/User');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.body.email && validator.isEmail(req.body.email)) {
    const keyword = crypto.randomBytes(10).toString('hex');

    User.findOneAndUpdate({"email": req.body.email}, 
    {$set: {
      "passwordReset": keyword
    }}, (err, user) => {
      if (err || !user) {
        req.session.error = 'not exist email';
        res.redirect('/auth/reset');
      }

      sendMail({
        email: user.email,
        userId: user._id,
        passwordKeyword: keyword
      }, 'passwordReset', () => {
        req.session.error = "send email";
        res.redirect('/auth/reset');
      });
    });
  } else {
    req.session.error = 'not valid email';
    res.redirect('/auth/reset');
  };
};
