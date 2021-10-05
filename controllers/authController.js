const { User } = require("../models");
const passport = require("passport")

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
    res.render("login")
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("register");
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    req.body.password = User.encryptPassword(req.body.password);
    const [user, created] = await User.findOrCreate(req.body);
    if (created) {
      req.login(user, () => res.redirect("/admin/articulos"));
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
}

// Show the form for editing the specified resource.
async function login(req, res) {
    passport.authenticate("local", { successRedirect: "/admin", failureRedirect: "/" })
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...


module.exports = {
  index,
  show,
  create,
  store,
  update,
  login,
  destroy,
};