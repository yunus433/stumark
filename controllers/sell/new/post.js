const async = require('async');

const Product = require('../../../models/product/Product');

function uploadToCloudinary(req, nameArray) {
  nameArray.forEach(name => {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + name,
      {
        public_id: "stumarkt/image_folder/" + name,
        quality: 25,
        format: "JPG"
      }
    );
  });
};

module.exports = (req, res, next) => {
  const productPhotoArray = [
  ];
  req.body.productPhotoNameArray.split(",").forEach(photoName => {
    productPhotoArray.push("http://res.cloudinary.com/dvnac86j8/image/upload/v1558412742/stumarkt/image_folder/" + photoName + ".jpg");
  });
  if (req.body.productPhotoNameArray.split(",").length > 0) {
    uploadToCloudinary(req, req.body.productPhotoNameArray.split(","));
  } else {
    productPhotoArray.push("/res/images/notAvailablePhoto.jpg");
  }

  const newProductData = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productPhotoArray,
    keywords: (req.body.description.replace('.', '').replace('!', '').replace('?', '').replace('-', ' ').toLowerCase() + " " + req.body.name.replace('.', '').replace('!', '').replace('?', '').replace('-', ' ').toLowerCase()).split(" "),
    location: req.body.address1 + " " + req.body.address2 + " " + req.body.address3 || "",
    owner: req.session.user._id,
    documentIndex: -1
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.redirect('/');

    Product.count({}, (err, number) => {
      if (err) return res.redirect('/');

      Product.findByIdAndUpdate(product._id, {$set: {
        documentIndex: number
      }}, {upsert: true, new: true}, err => {
        if (err) return res.redirect('/');
        
        return res.redirect('/sell');
      });
    });
  });
};
