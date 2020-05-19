const fs = require("fs");
const mongoose = require("mongoose");

const User = require("../../../models/user/User");

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "stumarkt/image_folder/" + req.file.filename,
        quality: 25,
        format: "JPG",
        secure: true
      },
      (err, result) => {
        if (err) res.sendStatus(500);

        User.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.session.user._id),
          {
            $set: {
              profilePhoto: result.secure_url
            }
          },
          (err, user) => {
            if (err) return res.sendStatus(500);
            req.session.user.profilePhoto = result.secure_url;

            if (
              user.profilePhoto != "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultUserPicture.png"
            ) {
              req.cloudinary.v2.uploader.destroy(
                "stumarkt/image_folder/" +
                  user.profilePhoto
                    .split("/")
                    [user.profilePhoto.split("/").length - 1].split(".")[0],
                err => {
                  if (err) res.sendStatus(500);

                  fs.unlink(
                    "./public/res/uploads/" + req.file.filename,
                    err => {
                      if (err) res.sendStatus(500);

                      res.write(result.secure_url);
                      res.end();
                    }
                  );
                }
              );
            } else {
              fs.unlink("./public/res/uploads/" + req.file.filename, err => {
                if (err) res.sendStatus(500);

                res.write(result.secure_url);
                res.end();
              });
            }
          }
        );
      }
    );
  } else {
    res.sendStatus(500);
  }
};
