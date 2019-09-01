const Product = require('../../models/product/Product');

function uploadToCloudinary(req, nameArray) {
  nameArray.forEach(name => {
    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + name,
      {
        public_id: "stumarkt/image_folder/" + name,
        quality: 25,
        format: "JPG",
        secure: true
      }
    );
  });
};


module.exports = (req, res) => {
  const productPhotoArray = [];

  if (req.body.productPhotoNameArray.length > 0) {
    uploadToCloudinary(req, req.body.productPhotoNameArray);
    req.body.productPhotoNameArray.forEach(photoName => {
      if (photoName) productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1558412742/stumarkt/image_folder/" + photoName + ".jpg");
    });
  } else {
    productPhotoArray.push("https://res.cloudinary.com/dvnac86j8/image/upload/v1566558526/stumarkt/defaultProductPicture.png");
  }

  const newProductData = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productPhotoArray,
    keywords: (req.body.description.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase() + "+" + req.body.name.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, "").toLowerCase()).split("+"),
    location: req.body.address1 + " " + req.body.address2 + " " + req.body.address3 || "",
    owner: req.body.userId,
    documentIndex: -1
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.status(500).json({"error": "Mongo Error: " + err});

    Product.count({}, (err, number) => {
      if (err) return res.status(500).json({"error": "Mongo Error: " + err});

      Product.findByIdAndUpdate(product._id, {$set: {
        documentIndex: number
      }}, {upsert: true, new: true}, err => {
        if (err) return res.status(500).json({"error": "Mongo Error: " + err});

        return res.status(200).json({product});
      });
    });
  });
};
