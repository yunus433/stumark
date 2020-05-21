module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/reset', {
      page: 'auth/reset',
      title: 'Reset Password',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      },
      err
    });
  } else if (req.session.resetUser) {
    const user = req.session.resetUser;
    req.session.destroy();
    res.render('auth/reset', {
      page: 'auth/reset',
      title: 'Şifreyi Sıfırla',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      },
      user
    });
  } else
    res.render('auth/reset', {
      page: 'auth/reset',
      title: 'Şifreyi Sıfırla',
      includes: {
        external: ['auth_css', 'js', 'fontawesome']
      }
    });
}
