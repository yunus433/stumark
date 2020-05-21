module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Registrierung',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      },
      err
    });
  } else
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Çıkış Yap',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      }
    });
}
