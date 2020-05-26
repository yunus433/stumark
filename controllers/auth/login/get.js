module.exports = (req, res, next) => {
  if (req.query.err)
    return res.render('auth/login', {
      page: 'auth/login',
      title: 'Giriş Yap',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      },
      err: req.query.err
    });
  else
    return res.render('auth/login', {
      page: 'auth/login',
      title: 'Giriş Yap',
      includes: {
        external: ['auth_css', 'fontawesome']
      }
    });
}
