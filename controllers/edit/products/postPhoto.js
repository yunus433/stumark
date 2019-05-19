const fs = require("fs");
const Product = require("../../../models/product/Product");

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "secondhand_data_base/image_folder/" + req.file.filename,
        quality: 25,
        format: "JPG"
      },
      (err, result) => {
        if (err) return res.redirect("/");

        Product.findOneAndUpdate(
          { _id: req.query.id },
          {
            $pull: {
              productPhotoArray: { productIndex: parseInt(req.query.index) }
            }
          },
          (err, product) => {
            if (err) return res.redirect("/");

            Product.findOneAndUpdate(
              { _id: req.query.id },
              {
                $push: {
                  productPhotoArray: {
                    $each: [
                      {
                        productIndex: parseInt(req.query.index),
                        source: result.url
                      }
                    ]
                  }
                }
              },
              err => {
                if (err) return res.redirect("/");
                Product.sortByProductPhotoIndex(req.query.id, err => {
                  if (err) return res.redirect('/');

                  if (product.productPhotoArray[req.query.index].source != "/res/images/notAvailablePhoto.jpg") {
                    req.cloudinary.v2.uploader.destroy( "secondhand_data_base/image_folder/" + product.productPhotoArray[req.query.index].source.split("/")[product.productPhotoArray[req.query.index].source.split("/").length - 1].split(".")[0],
                      err => {
                        if (err) return res.redirect("/");
  
                        fs.unlink(
                          "./public/res/uploads/" + req.file.filename,
                          err => {
                            if (err) return res.redirect("/");
  
                            res.redirect("/edit/product/?id=" + req.query.id);
                          }
                        );
                      }
                    );
                  } else {
                    fs.unlink(
                      "./public/res/uploads/" + req.file.filename,
                      err => {
                        if (err) return res.redirect("/");
  
                        res.redirect("/edit/product/?id=" + req.query.id);
                      }
                    );
                  };
                });
              }
            );
          }
        );
      }
    );
  } else {
    return res.redirect("/edit/product/?id=" + req.query.id);
  };
};
