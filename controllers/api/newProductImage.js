module.exports = (req, res) => {
  if (req.file && req.file.filename) {
    return res.status(200).json({"fileName": req.file.filename});
  } else {
    return res.status(400).json({"error": "No file found"});
  }
}
