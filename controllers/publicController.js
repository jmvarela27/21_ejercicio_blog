const { User } = require("../models");
// const Article = require("../models/index");

// Display a listing of the resource.
async function index(req, res) {
  Article.findAll().then((articles) => {
    console.log(articles);
  });
  res.render("home");
}

// Display the specified resource.
async function show(req, res) {
  res.render("articulo", { id: req.params.id });
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
};
