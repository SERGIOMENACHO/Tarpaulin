const bcrypt = require("bcryptjs");
const User = require("../modules/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const customerFields = {
  usernameField: "email",
  passwordField: "password",
};

// Local Strategy
passport.use(
  new LocalStrategy(customerFields, (email, password, done) => {
    // Match User
    User.findOne({ email: email })
      .then((user) => {
        // if no user has been found, create new User
        if (!user) {
          return done(null, false);
        } else {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
