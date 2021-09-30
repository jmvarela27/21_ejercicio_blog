const { Article, User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const articulos = await Article.findAll({
    include: [
      {
        model: User,
        required: true,
      },
    ],
  });
  res.render("adminHome", { articulos });
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("adminCrear");
}

// Store a newly created resource in storage.
async function store(req, res) {
  res.send("entré al crear");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const id = req.params.id;
  const articulo = await Article.findByPk(id, {
    include: [
      {
        model: User,
        required: true,
      },
    ],
  });
  res.render("adminEditar", { articulo });
}

// Update the specified resource in storage.
async function update(req, res) {
  res.send("entré al update");
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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
