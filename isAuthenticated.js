module.exports = (req, res, next) => {
    console.log(req.user)
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};
