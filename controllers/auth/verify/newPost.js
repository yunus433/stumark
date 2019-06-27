const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.query.id) {
    User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
      if (err) return res.redirect('/');
      sendMail({
        email: user.email,
        userId: user._id 
      }, 'userRegister', (err) => {
        req.session.user = user;
  
        return res.redirect('/auth/verify');
      });
    });
  }
}
