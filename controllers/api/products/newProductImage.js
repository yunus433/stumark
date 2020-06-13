const uploadPhoto = require('../../../utils/uploadPhoto');

module.exports = async (req, res) => {
  if (req.file && req.file.filename) {
    uploadPhoto(req.file.filename, req.file.size, (err, location) => {
      if (err) return res.status(500).json({ error: err })

      res.status(200).json({ url: location });
    });
  } else {
    return res.status(500).json({ error: err })
  }
}
