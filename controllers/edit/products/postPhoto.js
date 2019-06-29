const fs = require('fs');
const mongoose = require('mongoose')

const Product = require('../../../models/product/Product');

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "stumarkt/image_folder/" + req.file.filename,
        quality: 25,
        format: "JPG"
      },
      (err, result) => {
        if (err) res.sendStatus(500);

        Product.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.query.id),
          {
            $push: {
              productPhotoArray: result.url
            }
          },
          (err, product) => {
            if (err) return res.sendStatus(500);

            fs.unlink("./public/res/uploads/" + req.file.filename, err => {
              if (err) res.sendStatus(500);

              res.write(result.url);
              res.end();
            });
          }
        );
      });
  } else {
    return res.sendStatus(500);
  }
};
