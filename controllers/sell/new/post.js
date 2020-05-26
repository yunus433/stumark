const async = require('async');
const jimp = require('jimp');

const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res, next) => {
  if (!req.body || !req.body.category || !req.body.name || !req.body.description || !req.body.price || !req.body.city || !req.body.town)
    return res.redirect('/');

  const newProductData = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: (req.body.price == "ücretsiz"  ? req.body.price : (req.body.price + "₺")),
    productPhotoArray: req.body.productPhotoArray.length ? req.body.productPhotoArray.split(',') : ['https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png'],
    keywords: (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
    city: engName(req.body.city),
    city_name: req.body.city,
    town: req.body.town,
    owner: req.session.user._id,
    university: req.session.user.university
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.redirect('/');

    return res.redirect('/sell');
  });
};
