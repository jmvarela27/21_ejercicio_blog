require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models");
const APP_PORT = process.env.APP_PORT || 3000;
const passportConfig = require("./passportConfig")
const app = express();

//dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.use(
  session({
    secret: "AlgoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  }),
);

passportConfig(app)

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

routes(app);

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
