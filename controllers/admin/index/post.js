const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

module.exports = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.redirect('/');

    users.forEach(user => {
      if (!user.favorites)
        User.findByIdAndUpdate(mongoose.Types.ObjectId(user._id), {
          "favorites": []
        }, {}, (err, user) => {
          if (err) return res.redirect('/');
        });
    });

    return res.redirect('/admin');
  });
};
