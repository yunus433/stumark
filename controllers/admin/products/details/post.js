const mongoose = require('mongoose');

const Product = require('../../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.body || !req.body.name || !req.body.description || !req.body.city || !req.body.town || !req.body.category || !req.body.subcategory)
    return res.redirect('/admin');

  Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    name: req.body.name,
    description: req.body.description,
    keywords: (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
    price: req.body.price ? req.body.price + "₺" : "ücretsiz",
    price_number: req.body.price,
    city: req.body.city,
    town: req.body.town,
    category: req.body.category,
    subcategory: req.body.subcategory
  }}, {}, err => {
    if (err) return res.redirect('/admin');

    return res.redirect('/admin/products');
  });
}
