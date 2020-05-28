const AWS = require('aws-sdk');
const fs = require("fs");
const mongoose = require("mongoose");

const User = require("../../../models/user/User");

const uploadPhoto = require('../../../utils/uploadPhoto');

const s3 = new AWS.S3({	
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,	
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY	
});

module.exports = (req, res, next) => {
  if (req.file) {
    uploadPhoto(req.file.filename, req.file.size, (err, location) => {
      if (err) return res.sendStatus(500);

      User.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.session.user._id),
        {
          $set: {
            profilePhoto: location
          }
        },
        (err, user) => {
          if (err) return res.sendStatus(500);
          req.session.user.profilePhoto = location;

          if (user.profilePhoto != "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultUserPicture.png") {
            const params = {	
              Bucket: process.env.AWS_BUCKET_NAME,	
              Key: user.profilePhoto.split('com/')[1]	
            };

            s3.deleteObject(params, (err, data) => {
              if (err) return res.sendStatus(500);

              res.write(location);
              res.end();
            });
          } else {
            res.write(location);
            res.end();
          }
        }
      );
    });
  } else {
    res.sendStatus(500);
  }
};
