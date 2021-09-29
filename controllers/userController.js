const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
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
