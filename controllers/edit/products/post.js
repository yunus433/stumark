const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res, next) => {

  Product.findOneAndUpdate({"_id": req.query.id}, {$set: {
    "name": req.body.name,
    "description": req.body.description,
    "keywords": (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
    "price": req.body.price + "₺",
    "city": engName(req.body.city),
    "city_name": req.body.city,
    "town": req.body.town
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/sell/details/?id=' + req.query.id);
  });
};
