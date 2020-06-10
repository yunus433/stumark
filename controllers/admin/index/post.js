const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');
const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.find({}, {$set: {
    type: "lise"
  }}, {upsert: true}, (err, products) => {
    if (err) return res.redirect('/');

    return res.redirect('/admin');
  });
};
