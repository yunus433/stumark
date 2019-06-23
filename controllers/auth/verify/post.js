const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findByIdAndUpdate(req.query.id, {$set: {
    verified: true
  }}, {upsert: false}, (err, user) => {
    if (err || !user) return res.redirect('/');

    return res.redirect('/auth/login');
  });
};
