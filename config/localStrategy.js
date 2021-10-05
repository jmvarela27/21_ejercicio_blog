const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function (
      email,
      password,
      done,
    ) {
      try {
        const user = await User.findOne({ where: { email } });
        if (user === null) {
          return done(null, false, { message: "Incorrect credentials." });
        } else if (!(await user.validatePassword(password))) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        console.log(user.validatePassword(password));
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }),
  );
};
