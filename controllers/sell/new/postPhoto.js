module.exports = (req, res, next) => {
  if (req.file && req.file.filename) {
    res.write(req.file.filename);
    res.end();
  }
  else {
    res.sendStatus(500);
  }
}
