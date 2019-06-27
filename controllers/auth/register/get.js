module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Registrierung',
      includes: {
        external: ['auth_css', 'js']
      },
      err
    });
  } else
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Register',
      includes: {
        external: ['auth_css', 'js']
      }
    });
}
