const validator = require('validator');

const User = require('../../../../models/user/User');

const sendMail = require('../../../../utils/sendMail');

module.exports = (req, res) => {
  if (!req.body || !req.body.email || !req.body.name || !req.body.school || !req.body.password)
    return res.status(400).json({ error: 'bad request' })

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
        return res.status(400).json({ error: 'email is taken' });
      }
      if (err || !user) return res.status(500).json({ error: 'mongo Error: ' + err })

      return res.status(200).json({ user });
    });
  } else {
    return res.status(400).json({ error: 'email is not valid' })
  }
}
