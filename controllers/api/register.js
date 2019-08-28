const validator = require('validator');

const User = require('../../models/user/User');
const sendMail = require('../../utils/sendMail');

module.exports = (req, res, next) => {
  if (!req.query || !req.query.email || !req.query.name || !req.query.university || !req.query.password)
    return res.status(400).json({ "error": "Bad request" })

  if (validator.isEmail(req.query.email)) {
    const newUserData = {
      email: req.query.email,
      name: req.query.name,
      university: req.query.university,
      password: req.query.password
    }; 

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) {
        return res.status(400).json({ "error": "Email is taken" });
      }
      if (err || !user) res.status(500).json({ "error": "Mongo Error: " + err })

      sendMail({
        email: user.email,
        userId: user._id 
      }, 'userRegister', () => {
        return res.status(200).json({ "user": user })
      });
    });
  } else {
    return res.status(400).json({ "error": "Email is not valid" })
  }
}
