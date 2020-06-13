const uploadPhoto = require('../../../utils/uploadPhoto');

module.exports = async (req, res, next) => {
  if (req.file && req.file.filename) {
    uploadPhoto(req.file.filename, req.file.size, (err, location) => {
      if (err) return res.sendStatus(500)

      res.write(location);
      res.end();
    });
  } else {
    res.sendStatus(500);
  }
}
