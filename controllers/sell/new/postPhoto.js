module.exports = (req, res, next) => {
  if (req.file)
    return res.redirect('/sell/new/?image=' + req.file.filename)
  res.redirect('/sell/new');
}
