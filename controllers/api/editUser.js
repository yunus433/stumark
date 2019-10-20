const mongoose = require('mongoose');

const User = require("../../models/user/User");

module.exports = (req, res) => {
  if (req.body.password) {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      "password": req.body.password,
      "name": req.body.name,
      "email": req.body.email,
      "university": req.body.university
    }}, {}, (err, user) => {
      if (err) return res.status(500).json({"error: ": err});

      return res.status(200).json({user});
    });
  } else {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      "name": req.body.name,
      "email": req.body.email,
      "university": req.body.university
    }}, {}, (err, user) => {
      if (err) return res.status(500).json({"error: ": err});

      return res.status(200).json({user});
    });
  }
}
