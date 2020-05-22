const Product = require('../../../models/product/Product');

const getCityEngName = (city) => {
  return city.toLocaleLowerCase().replace("ş", "s").replace("ı", "i").replace("ö", "o").replace("ç", "c").replace("ü", "u").replace("ğ", "g");
}

module.exports = (req, res, next) => {

  Product.findOneAndUpdate({"_id": req.query.id}, {$set: {
    "name": req.body.name,
    "description": req.body.description,
    "keywords": (req.body.description.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase() + "+" + req.body.name.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase()).split("+"),
    "price": req.body.price,
    "city": getCityEngName(req.body.city),
    "city_name": req.body.city,
    "town": req.body.town
  }}, err => {
    if (err) return res.redirect('/');

    res.redirect('/sell/details/?id=' + req.query.id);
  });
};
