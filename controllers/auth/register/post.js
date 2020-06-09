const mongoose = require('mongoose');
const validator = require('validator');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    try {
      School.findById(mongoose.Types.ObjectId(req.body.school), (err, school) => {
        if (err || !school) {
          req.session.error = 'school error';
          return res.redirect('/auth/register');
        }
  
        const newUserData = {
          email: req.body.email.trim(),
          name: req.body.name,
          school: req.body.school,
          password: req.body.password.trim()
        };
    
        const newUser = new User(newUserData);
    
        newUser.save((err, user) => {
          if (err && err.code == 11000) {
            req.session.error = 'already taken email';
            return res.redirect('/auth/register');
          }
          if (err) return res.redirect('/');
    
          School.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.school), {$push: {
            users: user._id.toString()
          }}, {}, err => {
            if (err) return res.redirect('/');
  
            req.session.user = user;
            return res.redirect('/');
          });
        });
      });
    } catch (err) {
      req.session.error = 'school error';
      return res.redirect('/auth/register');
    }
  } else {
    req.session.error = 'not valid email';
    return res.redirect('/auth/register');
  }
}
