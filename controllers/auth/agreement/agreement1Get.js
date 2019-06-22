module.exports = (req, res, next) => {
  res.render('auth/agreement/1', {
    page: 'auth/agreement/1',
    title: 'Datenschutzerklärung',
    includes: {
      external: ['agreement_css']
    }
  });
}
