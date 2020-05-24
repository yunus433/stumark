const async = require('async');

const Product = require('../../../models/product/Product');

function uploadToCloudinary(cloudinary, photoArray, callback) {
  if (!photoArray.length)
    return callback(null, ["https://res.cloudinary.com/dvnac86j8/image/upload/v1566558526/stumarkt/defaultProductPicture.png"]);

  async.times(
    photoArray.length,
    (time, next) => {
      cloudinary.v2.uploader.upload(
        "./public/res/uploads/" + photoArray[time],
        {
          public_id: "stumarkt/image_folder/" + photoArray[time],
          quality: 25,
          format: "JPG",
          secure: true
        },
        (err, result) => {
          next(err, (err ? null : result.secure_url))
        });
    },
    (err, photoArray) => {
      return callback(err, photoArray);
    }
  );
};

const engName = word => {
  return word.toLocaleLowerCase().split('ş').join('s').split('ı').join('i').split('ö').join('o').split('ç').join('c').split('ü').join('u').split('ğ').join('g');
}

module.exports = (req, res, next) => {
  uploadToCloudinary(req.cloudinary, req.body.productPhotoNameArray.split(","), (err, productPhotoArray) => {
    if (err) return res.redirect('/');

    const newProductData = {
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price + "₺",
      productPhotoArray,
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
  });
};
