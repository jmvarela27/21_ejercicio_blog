const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
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
};
