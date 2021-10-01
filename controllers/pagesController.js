const { id } = require("date-fns/locale");
const { Article, User } = require("../models");

async function showHome(req, res) {
  const articulos = await Article.findAll({
    include: {
      model: User,
    },
  });
  res.render("home", { articulos });
}

async function showOne(req, res) {
  const articulo = await Article.findByPk(req.params.id, {
    include: {
      model: User,
    },
  });

  res.render("articulo", { articulo });
}

async function getArticlesFromApi(req, res) {
  // const [results, metadata] = await sequelize.query(
  //   "SELECT articles.id, articles.title, articles.content, users.firstname as authorFirstname, users.lastname as authorLastname FROM articles LEFT JOIN users ON articles.userId = users.id",
  // );

  const articulos = await Article.findAll({
    attributes: ["id", "title", "content"],
    include: {
      model: User,
      attributes: ["id", "firstname", "lastname", "email"],
    },
  });
  res.json(articulos);
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
  getArticlesFromApi,
  // showContact,
  // showAboutUs,
};
