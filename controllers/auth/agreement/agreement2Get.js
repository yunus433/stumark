module.exports = (req, res, next) => {
  res.render('auth/agreement/2', {
    page: 'auth/agreement/2',
    title: 'Nutzungsbedingungen',
    includes: {
      external: ['agreement_css']
    }
  });
}
