module.exports = (req, res, next) => {
  if (req.query.err)
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Einloggen',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      },
      err: req.query.err
    });
  else
  res.render('auth/login', {
    page: 'auth/login',
    title: 'Giriş Yap',
    includes: {
      external: ['auth_css', 'js', 'fontawesome']
    }
  });
}
