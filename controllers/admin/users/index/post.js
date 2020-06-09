const validator = require('validator');

const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.email || !req.body.name || !req.body.school || !req.body.password)
    return res.redirect('/admin');

  if (validator.isEmail(req.body.email)) {
    const newUserData = {
      email: req.body.email,
      name: req.body.name,
      school: req.body.school,
      password: req.body.password
    };

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) {
        return res.redirect('/admin');
      }
      if (err || !user) return res.redirect('/admin');

      return res.redirect('/admin/users');
    });
  } else {
    return res.redirect('/admin');
  }
}
