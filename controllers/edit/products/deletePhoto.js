const AWS = require('aws-sdk');
const mongoose = require('mongoose');

const Product = require('../../../models/product/Product');

const s3 = new AWS.S3({	
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,	
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY	
});

module.exports = (req, res, next) => {
  if (req.body.photo) {
    const params = {	
      Bucket: process.env.AWS_BUCKET_NAME,	
      Key: req.body.photo.split('com/')[1]	
    };

    s3.deleteObject(params, (err, data) => {
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
