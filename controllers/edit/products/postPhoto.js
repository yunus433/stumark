const fs = require('fs');
const mongoose = require('mongoose')
const jimp = require('jimp');

const Product = require('../../../models/product/Product');

module.exports = async (req, res, next) => {
  if (req.file) {
    const image_path = "./public/res/uploads/" + req.file.filename

    const image = await jimp.read(image_path);
    const image_quality = Math.max(Math.min(100000 * 100 / req.file.size, 100), 10);
  
    await image.quality(image_quality);
    await image.writeAsync(image_path);
  
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "stumarkt/product_photo/" + req.file.filename,
        format: "JPG",
        secure: true,
        quality: 100
      },
      (err, result) => {
        if (err) return res.status(400).json({ error: err });
  
        Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
            $push: {
              productPhotoArray: result.secure_url
            }
          }, {new: true},
          (err, product) => {
            if (err) return res.sendStatus(500);

            fs.unlink("./public/res/uploads/" + req.file.filename, err => {
              if (err) res.sendStatus(500);

              if (!product.productPhotoArray.includes('https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png')) {
                res.write(result.secure_url);
                return res.end();
              }

              Product.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
                $pull: {
                  productPhotoArray: 'https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultProductPicture.png'
                }}, err => {
                  if (err) return res.sendStatus(500);

                  res.write(result.secure_url);
                  return res.end();
                });
            });
          }
        );
      });
  } else {
    return res.sendStatus(500);
  }
};
