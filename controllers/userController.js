const { User } = require("../models");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("register");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  if (
    !validator.isEmail(email) ||
    !validator.isLength(firstname, { min: 2, max: 40 }) ||
    !validator.isLength(lastname, { min: 2, max: 40 }) ||
    !validator.isStrongPassword(password)
  ) {
    res.status(406).send("Credenciales inválidas");
  } else {
    try {
      const hash = await bcrypt.hash(password, 10);
      await User.create({ firstname, lastname, email, password: hash });
      console.log(hash);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...
async function showLogin(req, res) {
  res.render("login");
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showLogin,
};
