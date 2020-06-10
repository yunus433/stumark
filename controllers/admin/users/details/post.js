const mongoose = require('mongoose');

const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.email)
    return res.redirect('/admin');

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    email: req.body.email,
    school: req.body.school
  }}, {new: true}, (err, user) => {
    if (err) return res.redirect('/admin');
    
    if (!req.body.password || req.body.password.length < 6)
      return res.redirect('/admin/users');

    user.password = req.body.password;

    user.save(err => {
      if (err) return res.redirect('/admin');

      return res.redirect('/admin/users');
    });
  });
}
