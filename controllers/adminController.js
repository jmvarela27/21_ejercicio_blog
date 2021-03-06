const { Article, User } = require("../models");
// const fs = require("fs");
const path = require("path");

// Display a listing of the resource.
async function index(req, res) {
  const articulos = await Article.findAll({
    include: { model: User },
    order: [["createdAt", "DESC"]],
  });
  res.render("adminHome", { articulos });
}

// Show the form for creating a new resource
async function create(req, res) {
  const users = await User.findAll();
  const error = { msg: "" };
  res.render("adminCrear", { users, error });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const users = await User.findAll();

  const formidable = require("formidable");
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { titulo, contenido, autor } = fields;
    const image = files.image.path;
    if (titulo === "" || contenido === "") {
      const error = {
        msg: "Error al editar. Los campos título y contenido no pueden estar vacíos",
        title: titulo,
        content: contenido,
        author: autor,
        image: image,
      };
      res.render("adminCrear", { users, error });
    } else {
      const articulo = {
        title: fields.titulo,
        content: fields.contenido,
        userId: fields.autor,
        image: path.basename(files.image.path),
      };
      const response = await Article.create(articulo);
      res.redirect("/admin/articulos");
    }
  });
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

// Update the specified resource in storage. EDITAR
async function update(req, res) {
  const formidable = require("formidable");

  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { titulo, contenido, autor } = fields;
    const image = files.image.path;
    if (titulo === "" || contenido === "") {
      const articulo = {
        id: req.params.id,
        title: titulo,
        content: contenido,
        author: autor,
        image: image,
        user: {
          id: fields.autor,
        },
      };
      const error = {
        msg: "Error al editar. Los campos título y contenido no pueden estar vacíos",
      };
      const users = await User.findAll();
      res.render("adminEditar", { articulo, users, error });
    } else {
      const articulo = {
        title: fields.titulo,
        content: fields.contenido,
        userId: fields.autor,
        image: path.basename(files.image.path),
      };
      const response = await Article.update(articulo, {
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/admin/articulos");
    }
  });

  // const articulo = { title: req.body.titulo, content: req.body.contenido, userId: req.body.autor };
  // const response = await Article.update(articulo, {
  //   where: {
  //     id: req.params.id,
  //   },
  // });
  // res.redirect("/admin/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const { unlink } = require("fs");
  const articulo = await Article.findByPk(req.params.id);
  unlink(__dirname + "/../public/img/" + articulo.image, (err) => {
    if (err) throw err;
    console.log("Se borró el archivo " + articulo.image);
  });

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
