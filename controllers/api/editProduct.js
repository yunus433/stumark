const mongoose = require('mongoose');

const Product = require('../../models/product/Product');

module.exports = (req, res) => {
  if (req.body && req.body.id && req.body.name && req.body.description && req.body.price && req.body.location) {
    Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
      "name": req.body.name,
      "description": req.body.description,
      "price": req.body.price,
      "location": req.body.location,
      "keywords": (req.body.description.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase() + "+" + req.body.name.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase()).split("+")
    }}, {new: true}, (err, product) => {
      if (err) return res.status(500).json({"error": "Mongo Error: " + err});

      return res.status(200).json({product});
    });
  } else if (req.body && req.body.id && req.body.delete) {
    Product.findByIdAndDelete(mongoose.Types.ObjectId(req.body.id), err => {
      if (err) return res.redirect('/');
  
      return res.status(200).json({"success": true});
    });
  } else {
    return res.status(400).json({"error": "Bad request"});
  }
};
