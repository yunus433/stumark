const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.email || !req.query.password)
    return res.status(400).json({ "error": "Bad request" });

  User.findUser(req.query.email, req.query.password, (err, user) => {
    if (err || !user)
      return res.status(404).json({ "error": "User not found" });

    return res.status(200).json({ "user": user });
  });
}
