require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

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
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, function (
    email,
    password,
    done,
  ) {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return done(null,false,{message:"Incorrect credentials."})
    } else if(!user.validatePassword(password,bcrypt)) {
      return done(null,false,{message:"Incorrect credentials."})
    }
  }),
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

routes(app);

dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
