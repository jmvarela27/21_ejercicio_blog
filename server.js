require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

//dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.use(
  session({
    secret: "AlgoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function (
    email,
    password,
    done,
  ) {
    const user = await User.findOne({ where: { email } });
    // console.log(user);
    if (user === null) {
      return done(null, false, { message: "Incorrect credentials." });
    } else if (!password === user.password) {
      return done(null, false, { message: "Incorrect credentials." });
    }
    return done(null, user);
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, user);
  }
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/admin", failureRedirect: "/" }),
);

app.post("/registro", async (req, res) => {
  const [user, created] = await User.findOrCreate(req.body);
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
});

app.get("/admin", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("adminHome");
  } else {
    res.redirect("/login");
  }
});

routes(app);

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
