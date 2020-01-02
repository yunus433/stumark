const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.id || !req.body.token)
    return res.status(400).json({ "error": "Bad request" });
    
  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
    "notificationToken": req.body.token
  }}, {new: true}, (err, user) => {
    console.log(err, user);
    if (err) return res.status(500).json({ "error": err });

    console.log("sending user");
    return res.status(200).json({ "user": user });
  });
}