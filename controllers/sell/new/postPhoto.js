const fs = require('fs');
const jimp = require('jimp');

module.exports = async (req, res, next) => {
  if (req.file && req.file.filename) {
    const image_path = "./public/res/uploads/" + req.file.filename;

    const image = await jimp.read(image_path);
    const image_quality = Math.max(Math.min(200000 * 100 / req.file.size, 100), 10);
  
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
    
        fs.unlink("./public/res/uploads/" + req.file.filename, err => {
          res.write(result.secure_url);
          res.end();
        });
      });
  } else {
    res.sendStatus(500);
  }
}
