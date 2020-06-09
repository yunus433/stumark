const User = require('../../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.email || !req.body.password)
    return res.status(400).json({ error: 'bad request' });

  User.findUser(req.body.email, req.body.password, (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'user not found' });

    return res.status(200).json({ user });
  });
}
