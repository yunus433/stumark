module.exports = (req, res, next) => {
  if (req.session.notVerifiedUser)
    res.render('auth/verify', {
      page: 'auth/verify',
      title: 'Verify',
      includes: {
        external: ['auth_css']
      },
      user: req.session.notVerifiedUser
    });
  else
    return res.redirect('/auth/login');
}
