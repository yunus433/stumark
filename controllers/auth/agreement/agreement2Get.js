module.exports = (req, res, next) => {
  res.render('auth/agreement/2', {
    page: 'auth/agreement/2',
    title: 'Veri Koruma Antlaşması',
    includes: {
      external: ['agreement_css']
    }
  });
}
