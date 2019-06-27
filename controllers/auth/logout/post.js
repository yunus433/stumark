module.exports = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}
