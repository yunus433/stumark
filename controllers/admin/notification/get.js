module.exports = (req, res) => {
  res.render('admin/notification', {
    page: "admin/notification",
    title: "Notification",
    includes: {
      external: ["css", "admin_general_css", "fontawesome"]
    }
  });
};
