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
          next(err, result.secure_url)
        });
    },
    (err, photoArray) => {
      return callback(err, photoArray);
    }
  );
};

const getCityEngName = (city) => {
  return city.toLocaleLowerCase().replace("ş", "s").replace("ı", "i").replace("ö", "o").replace("ç", "c").replace("ü", "u").replace("ğ", "g");
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
      keywords: (req.body.description.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase() + "+" + req.body.name.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase()).split("+"),
      city: getCityEngName(req.body.city),
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
