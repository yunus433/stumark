const mongoose = require('mongoose');

const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.body.photo) {
    req.cloudinary.v2.uploader.destroy(
      req.body.photo,
      err => {
        if (err) return res.sendStatus(500);

        Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$pull: {
          productPhotoArray: req.body.photo
        }}, {new: true}, (err, product) => {
          if (err) return res.sendStatus(500);

          if (product.productPhotoArray.length)
            return res.sendStatus(200);
          
          Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$push: {
            productPhotoArray: 'https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png'
          }}, err => {
            if (err) return res.sendStatus(500);

            return res.sendStatus(200);
          });
        });
      }
    );
  } else {
    res.sendStatus(500);
  };
};
