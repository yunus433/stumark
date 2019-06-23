module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    req.session.redirect = req.originalUrl;
    res.redirect('/auth/login');
  };
};
