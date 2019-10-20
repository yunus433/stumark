const mongoose = require('mongoose');
const validator = require('validator');

const User = require("../../models/user/User");

module.exports = (req, res) => {
  if (!req.body || !req.body.email || !req.body.name || !req.body.university)
    return res.status(400).json({"error: ": "Bad request"});
    
  if (!validator.isEmail(req.body.email))
    return res.status(400).json({"error: ": "not valid email"});

  if (req.body.password) {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      "password": req.body.password,
      "name": req.body.name,
      "email": req.body.email,
      "university": req.body.university
    }}, {new: true}, (err, user) => {
      if (err && err.code == 11000) return res.status(400).json({"error: ": "email already taken"});
      if (err) return res.status(500).json({"error: ": err});

      return res.status(200).json({user});
    });
  } else {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
      "name": req.body.name,
      "email": req.body.email,
      "university": req.body.university
    }}, {new: true}, (err, user) => {
      if (err && err.code == 11000) return res.status(400).json({"error: ": "email already taken"});
      if (err) return res.status(500).json({"error: ": err});

      return res.status(200).json({user});
    });
  }
}
