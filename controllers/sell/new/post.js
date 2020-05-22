const Product = require('../../../models/product/Product');

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

const getCityEngName = (city) => {
  return city.toLocaleLowerCase().replace("ş", "s").replace("ı", "i").replace("ö", "o").replace("ç", "c").replace("ü", "u").replace("ğ", "g");
}

module.exports = (req, res, next) => {
  const productPhotoArray = [];

  if (req.body.productPhotoNameArray.length > 0) {
    uploadToCloudinary(req, req.body.productPhotoNameArray.split(","));
    req.body.productPhotoNameArray.split(",").forEach(photoName => {
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
    city: getCityEngName(req.body.city),
    city_name: req.body.city,
    town: req.body.town,
    owner: req.session.user._id,
    university: req.session.user.university
  };

  const newProduct = new Product(newProductData);

  newProduct.save((err, product) => {
    if (err) return res.redirect('/');

    return res.redirect('/sell');
  });
};
