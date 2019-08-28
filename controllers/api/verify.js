const mongoose = require('mongoose');

const User = require('../../models/user/User');
const sendMail = require('../../utils/sendMail');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ "success": false });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err) return res.status(400).json({ "success": false });

    sendMail({
      email: user.email,
      userId: user._id 
    }, 'userRegister', (err) => {
      if (err) return res.status(400).json({ "success": false });

      return res.status(200).json({ "success": true });
    });
  });
}
