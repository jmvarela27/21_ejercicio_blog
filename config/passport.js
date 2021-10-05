const { User } = require("../models");
const passport = require("passport");
const localStrategy = require("./localStrategy");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  localStrategy(passport);

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
};
