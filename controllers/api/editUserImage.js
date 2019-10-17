const fs = require("fs");
const mongoose = require("mongoose");

const User = require("../../models/user/User");

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "stumarkt/image_folder/" + req.file.filename,
        quality: 25,
        format: "JPG",
        radius: "max",
        crop: "crop",
        secure: true
      },
      (err, result) => {
        if (err) return res.status(500).json({"error": err});

        User.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.query.id),
          {
            $set: {
              profilePhoto: result.secure_url
            }
          },
          (err, user) => {
            if (err) return res.status(500).json({"error": err});

            if (
              user.profilePhoto != "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/stumarkt/defaultUserPicture.png"
            ) {
              req.cloudinary.v2.uploader.destroy(
                "stumarkt/image_folder/" +
                  user.profilePhoto
                    .split("/")
                    [user.profilePhoto.split("/").length - 1].split(".")[0],
                err => {
                  if (err) return res.status(500).json({"error": err});

                  fs.unlink(
                    "./public/res/uploads/" + req.file.filename,
                    err => {
                      if (err) return res.status(500).json({"error": err});

                      return res.status(200).json({"image": result.secure_url});
                    }
                  );
                }
              );
            } else {
              fs.unlink("./public/res/uploads/" + req.file.filename, err => {
                if (err) return res.status(500).json({"error": err});

                return res.status(200).json({"image": result.secure_url});
              });
            }
          }
        );
      }
    );
  } else {
    
  }
};
