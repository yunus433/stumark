const mongoose = require('mongoose');

const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ "success": false });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    "verified": true
  }}, err => {
    if (err) return res.status(400).json({ "success": false });

    return res.status(200).json({ "success": true });
  })
}
