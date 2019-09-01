module.exports = (req, res) => {
  if (req.body.file) {
    return res.status(200).json({"fileName": req.file.filename});
  } else {
    return res.status(400).json({"error": "No file found"});
  }
}
