const { Article, User } = require("../models");
// const fs = require("fs");
const path = require("path");

// Display a listing of the resource.
async function index(req, res) {
  const articulos = await Article.findAll({
    include: { model: User },
  });
  res.render("adminHome", { articulos });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const formidable = require("formidable");
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  // form.on("file", function (field, file) {
  //   fs.rename(file.path, form.uploadDir + "/" + file.name, (e) => {});
  // });

  form.parse(req, async (err, fields, files) => {
    const articulo = {
      title: fields.titulo,
      content: fields.contenido,
      userId: fields.autor,
      image: path.basename(files.image.path),
    };
    const response = await Article.create(articulo);
    res.redirect("/admin/articulos");
  });

  // const articulo = { title: req.body.titulo, content: req.body.contenido, userId: req.body.autor };
  // const response = await Article.create(articulo);
  // res.redirect("/admin/articulos");
}

// Show the form for creating a new resource
async function create(req, res) {
  const users = await User.findAll();

  res.render("adminCrear", { users });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const id = req.params.id;
  const users = await User.findAll();
  const articulo = await Article.findByPk(id, {
    include: { model: User },
  });
  res.render("adminEditar", { articulo, users });
}

// Update the specified resource in storage.
async function update(req, res) {
  const articulo = { title: req.body.titulo, content: req.body.contenido, userId: req.body.autor };
  const response = await Article.update(articulo, {
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const response = await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/articulos");
}

// Display the specified resource.
async function show(req, res) {}

// Otros handlers...
// ...

// Return json
async function apiCreation(req, res) {}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  apiCreation,
};
