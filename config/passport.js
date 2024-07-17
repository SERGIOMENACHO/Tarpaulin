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

    User.findOne({ email: email })
      .then((user) => {
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
  console.log("User has been serialized")
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("We are here now")
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
