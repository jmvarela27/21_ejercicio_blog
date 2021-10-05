const session = require("express-session");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgoSuperSecreto",
      resave: false,
      saveUninitialized: false,
    }),
  );
};
