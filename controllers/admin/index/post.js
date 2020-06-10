const async = require('async');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');
const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.find({}, (err, schools) => {
    if (err) return res.redirect('/');

    async.parallel(
      schools.length,
      (time, next) => {
        School.findByIdAndUpdate(mongoose.Types.ObjectId(schools[time]._id), {$set: {
          "type": "Lise"
        }}, {}, (err, school) => next(err, school));
      },
      (err, schools) => {
        if (err) return res.redirect('/');

        return res.redirect('/admin');
      }
    );
  });
};
