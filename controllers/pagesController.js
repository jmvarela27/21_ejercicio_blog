const { id } = require("date-fns/locale");
const { Article, User, Comment } = require("../models");

async function showHome(req, res) {
  const articulos = await Article.findAll({
    include: { model: User },
    order: [["createdAt", "DESC"]],
  });
  res.render("home", { articulos });
}

async function showOne(req, res) {
  if (isNaN(req.params.id)) return res.status(400).send("Esta página no es válida");

  const articulo = await Article.findByPk(req.params.id, {
    include: {
      model: User,
    },
  });

  const comments = await Comment.findAll({
    where: { articleId: req.params.id },
  });

  res.render("articulo", { articulo, comments });
}

async function apiCreation(req, res) {
  const articulos = await Article.findAll({
    include: {
      model: User,
    },
  });
  res.json(articulos);
}

async function storeComment(req, res) {
  const { comment, authorName } = req.body;
  if (comment === "" || authorName === "") {
    const articulo = await Article.findByPk(req.params.id, {
      include: {
        model: User,
      },
    });

    const comments = await Comment.findAll({
      where: { articleId: req.params.id },
    });

    const error = "Error al enviar comentario. Todos los campos son obligatorios.";

    res.render("articulo", { articulo, comments, error });
  } else {
    const response = await Comment.create({
      content: comment,
      authorName: authorName,
      articleId: req.params.id,
    });
    res.redirect(`/${req.params.id}#comment${response.id}`);
  }
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
  storeComment,
  apiCreation,
  // showContact,
  // showAboutUs,
};
