const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ user });
    });
  } else if (req.query && req.query.email) {
    User.findOne({ "email": req.query.email }, (err, user) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ user });
    });
  } else {
    User.find({}, (err, users) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });
      return res.status(200).json({ users })
    });
  }
};
