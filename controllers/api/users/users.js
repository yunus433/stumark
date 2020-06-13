const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
      if (err)
        return res.status(500).json({ "error": "Mongo Error: " + err });

      School.findById(mongoose.Types.ObjectId(user.school), (err, school) => {
        if (err) return res.status(500).json({ "error": "Mongo Error: " + err });

        return res.status(200).json({ user, school_name: school.name });
      });
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
