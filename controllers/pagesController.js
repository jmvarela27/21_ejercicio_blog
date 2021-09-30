const { Article } = require("../models");

async function showHome(req, res) {
  const articulos = await Article.findAll();
  res.render("home", { articulos });
}

async function showOne(req, res) {
  const articulo = await Article.findByPk(req.params.id);
  res.render("articulo", { articulo });
}
// async function showContact(req, res) {
//   res.render("contact");
// }

// async function showAboutUs(req, res) {
//   res.render("aboutUs");
// }

// Otros handlers...
// ...

module.exports = {
  showHome,
  showOne,
  // showContact,
  // showAboutUs,
};
