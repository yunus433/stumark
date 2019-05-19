module.exports = (req, res, next) => {
  if (req.query.err)
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Register',
      includes: {
        external: ['auth_css', 'js']
      },
      err: req.query.err
    });
  else
  res.render('auth/register', {
    page: 'auth/register',
    title: 'Register',
    includes: {
      external: ['auth_css', 'js']
    }
  });
}
