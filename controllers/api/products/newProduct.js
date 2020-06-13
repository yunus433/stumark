const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Product = require('../../../models/product/Product');

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res) => {
  if (!req.body || !req.body.category || !req.body.subcategory || !req.body.name || !req.body.description || !req.body.price || !req.body.city || !req.body.town)
    return res.status(400).json({ error: 'bad request' });

  User.findById(mongoose.Types.ObjectId(req.body.userId), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "mongo Error: " + err });

    const newProductData = {
      category: req.body.category,
      subcategory: req.body.subcategory,
      name: req.body.name,
      description: req.body.description,
      price: (req.body.price == 0  ? "ücretsiz" : (req.body.price.split('₺').join('') + "₺")),
      price_number: parseInt(req.body.price),
      productPhotoArray: req.body.productPhotoArray.length ? req.body.productPhotoArray : ['https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png'],
      keywords: (engName(req.body.description).split(' ').join('+').split('\n').join('+').split('\t').join('+') + "+" + engName(req.body.name).split(' ').join('+').split('\n').join('+').split('\t').join('+')).split("+"),
      school: user.school,
      city: engName(req.body.city),
      city_name: req.body.city,
      town: req.body.town,
      owner: req.body.userId
    };
  
    const newProduct = new Product(newProductData);
  
    newProduct.save((err, product) => {
      if (err || !user) return res.status(500).json({ error: "mongo Error: " + err });
  
      return res.status(200).json({ success: true });
    });
  });
};
