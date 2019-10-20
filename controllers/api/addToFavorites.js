const mongoose = require('mongoose');

const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ "error": "Bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), { $push: {
    "favorites": req.body.productId
  }}, {new: true}, (err, user) => {
    if (err) return res.status(500).json({ "error": err });

    return res.status(200).json({ "user": user })
  });
};
