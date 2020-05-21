module.exports = (req, res, next) => {
  return res.render("edit/user", {
    page: "edit/user",
    title: "Ayarlar",
    includes: {
      external: ["css", "js", "fontawesome"]
    },
    user: req.session.user
  });
};
