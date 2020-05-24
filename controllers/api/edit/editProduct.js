const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res) => {
  if (req.body && req.body.id && req.body.name && req.body.description && req.body.price && req.body.location) {
    Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
      "name": req.body.name,
      "description": req.body.description,
      "price": req.body.price + "₺",
      "city": engName(req.body.city),
      "city_name": req.body.city,
      "town": req.body.town,
      "keywords": (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
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
