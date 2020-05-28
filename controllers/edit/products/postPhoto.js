const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

const uploadPhoto = require('../../../utils/uploadPhoto');

module.exports = async (req, res, next) => {
  if (req.file) {
    uploadPhoto(req.file.filename, req.file.size, (err, location) => {
      if (err) return res.redirect('/');

      Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
        $push: {
          productPhotoArray: location
        }
      }, {new: true},
      (err, product) => {
        if (err) return res.sendStatus(500);

        if (!product.productPhotoArray.includes('https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png')) {
          res.write(location);
          return res.end();
        }

        Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
          $pull: {
            productPhotoArray: 'https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png'
          }}, err => {
            if (err) return res.sendStatus(500);

            res.write(location);
            return res.end();
          });
      });
    });
  } else {
    return res.sendStatus(500);
  }
};
