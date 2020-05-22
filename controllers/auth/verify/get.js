module.exports = (req, res, next) => {
  return res.redirect('/');

  // if (req.session.notVerifiedUser)
  //   res.render('auth/verify', {
  //     page: 'auth/verify',
  //     title: 'Verify',
  //     includes: {
  //       external: ['auth_css', 'js']
  //     },
  //     user: req.session.notVerifiedUser
  //   });
  // else
  //   return res.redirect('/auth/login');
}
