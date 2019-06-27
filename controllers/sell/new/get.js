module.exports = (req, res, next) => {
  if (req.query.image)
    return res.render('sell/new', {
      page: 'sell/new',
      title: 'Neue Anzeige',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      user: req.session.user,
      img: '/res/uploads/' + req.query.image
    });
  else
    return res.render('sell/new', {
      page: 'sell/new',
      title: 'Neue Anzeige',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      user: req.session.user,
      img: '/res/images/defaultProductPicture.png'
    });
}
