const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
    app.use(session({

    }));
};